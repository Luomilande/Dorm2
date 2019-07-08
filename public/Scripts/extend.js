function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

$.extend({
    showMessage: function (title, content, delay) {
        var mbx = $('#messageBox');
        let uid = uuid();
        var cen = `<div id="${uid}" style="width:330px;margin-bottom:12px; display:none;  min-height:78px; padding: 14px 26px 14px 13px; border-radius: 8px; box-sizing: border-box; border: 1px solid #ebeef5; position: relative;background-color: #fff;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); overflow: hidden;">
        <h2 style="font-weight: 700;font-size: 16px;color: #303133; margin: 0;">${title}</h2>
        <div style="font-size: 14px; line-height: 21px;margin: 6px 0 0; color: #606266; text-align: justify;">
            <p>${content}</p>
        </div>
        </div>`;
        if (mbx.length==0) {
            $('body').append(`<div id="messageBox" style="position: fixed; max-width:350px; right: 16px;top:  16px; z-index: 999; "> </div>`);
            mbx = $('#messageBox');
        }
        mbx.append(cen);
        $('#' + uid).fadeToggle();
        setTimeout(function () {
            $('#' + uid).remove();
            var result= mbx.find('>div');
            if(result.length==0) mbx.remove();
        }, delay || 5 * 1000);
    }
})