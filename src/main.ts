import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { Conf } from './units/conf';

var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data


async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(cookieParser());
    //解决跨域
    app.use('*', upload.array(), function (req, res, next) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        //req.originalUrl

        if (req.method == 'OPTIONS') {
            res.end();
        }
        else {
            let token = req.cookies.token || null;
            if (Conf.debug || Conf.findPath(req.originalUrl) || Conf.findToken(token)) {
                next();
            } else {
                res.clearCookie('token');
                res.redirect("login.html");
                //res.end(JSON.stringify({ code: 20000, message: '用户未登录' }));
            }
        }
    });

    await app.listen(Conf.port || 3000);
}

bootstrap();
