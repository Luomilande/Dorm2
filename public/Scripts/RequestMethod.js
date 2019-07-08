// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt, flag) { //author: meizz 
    //console.log(fmt);
    var _flag = false;
    if (flag !== undefined) {
        _flag = flag;
    }
    var o = {
        "M+": (_flag ? this.getUTCMonth() + 1 : this.getMonth() + 1), //月份 
        "d+": (_flag ? this.getUTCDate() : this.getDate()), //日 
        "h+": (_flag ? this.getUTCHours() : this.getHours()), //小时 
        "m+": (_flag ? this.getUTCMinutes() : this.getMinutes()), //分 
        "s+": (_flag ? this.getUTCSeconds() : this.getSeconds()), //秒 
        "q+": (_flag ? Math.floor((this.getUTCMonth() + 3) / 3) : Math.floor((this.getMonth() + 3) / 3)), //季度 
        "S": (_flag ? this.getUTCMilliseconds : this.getMilliseconds()) //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((_flag ? this.getUTCFullYear() : this.getFullYear()) + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))));
        }
    }

    return fmt;
};
//H5定时 缓存  
var LoaclCache = {
    /*设置缓存*/
    set: function (key, val, time) {
        try {
            if (!localStorage) { return false; }
            if (!time || isNaN(time)) { time = 20 * 60; }  //默认存储20分钟
            var cacheExpireDate = (new Date() - 1) + time * 1000;
            var cacheVal = { val: val, exp: cacheExpireDate };
            localStorage.setItem(key, JSON.stringify(cacheVal));//存入缓存值  
            //console.log(key+":存入缓存，"+new Date(cacheExpireDate)+"到期");  
        } catch (e) { }
    },
    /**获取缓存*/
    get: function (key) {
        try {
            if (!localStorage) { return false; }
            var cacheVal = localStorage.getItem(key);
            var result = JSON.parse(cacheVal);
            var now = new Date() - 1;
            if (!result) { return null; }//缓存不存在  
            if (now > result.exp) {//缓存过期  
                this.remove(key);
                return null;
            }
            //console.log("get cache:"+key);  
            return result.val;
        } catch (e) {
            this.remove(key);
            return null;
        }
    },/**移除缓存，一般情况不手动调用，缓存过期自动调用*/
    remove: function (key) {
        if (!localStorage) { return false; }
        localStorage.removeItem(key);
    },/**清空所有缓存*/
    clear: function () {
        if (!localStorage) { return false; }
        localStorage.clear();
    }
};

var origin = "http://192.168.2.101:3000";
function RequestByPostMethod(RequestUrl, PostObject, Callback) {
    //异步传输数据功能
    $.ajax({

        type: "POST", //数据传输方式：POST/GET
        url: origin + RequestUrl, //数据提交到哪个地方

        data: PostObject, //需提交的数据内容

        success: function (data) {
            try {
                //数据提交成功的事件
                Callback(JSON.parse(data)); //参数Callback为回调函数
            }
            catch (err) {
                console.log(data)
                Callback(data)
            }
        },
        error: function (data) {
            //数据提交失败的事件
            alert('提交失败！');
        }
    });
}
axios.defaults.responseType = 'text';
axios.defaults.baseUrl = origin;
axios.defaults.headers = [{ 'X-Requested-With': 'XMLHttpRequest' }, { "X-Token": "1111" }];
console.log(axios.defaults)
function AxiosPost(Url, Data, Callback) {
    axios.post(Url, Data).then(function (response) {
        console.log(response.data);
        Callback(response.data);
    }).catch(function (error) {
        console.log(error);
    });
}
function AxiosGet(Url, Data, Callback) {
    axios.get(Url, Data).then(function (response) {
        console.log(response.data);
        Callback(response.data);
    }).catch(function (error) {
        console.log(error);
    });
}