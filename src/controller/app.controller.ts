import { Controller, Get, Render, Req } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { Conf } from '../units/conf';
import { Request } from 'express';


@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    @Render('index')
    async index(@Req() req: Request): Promise<object> {
        let user = Conf.getUserByToken(req.cookies.token);
        return { user: user };
    }
    @Get('index.html')
    @Render('index')
    async indexhtml(@Req() req: Request): Promise<object> {
        let user = Conf.getUserByToken(req.cookies.token);
        return { user: user };
    }
    @Get('admininfo.html')
    @Render('admininfo')
    async admininfo(@Req() req: Request): Promise<object> {
        let user = Conf.getUserByToken(req.cookies.token);
        return { user: user };
    }
    @Get('dorminfo.html')
    @Render('dorminfo')
    async dorminfo(@Req() req: Request): Promise<object> {
        let user = Conf.getUserByToken(req.cookies.token);
        return { user: user };
    }
    @Get('dormMan.html')
    @Render('dormMan')
    async dormMan(@Req() req: Request): Promise<object> {
        let user = Conf.getUserByToken(req.cookies.token);
        return { user: user };
    }
    @Get('outInInput.html')
    @Render('outInInput')
    async outInInput(@Req() req: Request): Promise<object> {
        let user = Conf.getUserByToken(req.cookies.token);
        return { user: user };
    }
    @Get('studentInfo.html')
    @Render('studentInfo')
    async studentInfo(@Req() req: Request): Promise<object> {
        let user = Conf.getUserByToken(req.cookies.token);
        return { user: user };
    }

    @Get('login.html')
    @Render('login')
    async login(): Promise<object> {
        return null;
    }

    // @Get('get')
    // async get(): Promise<object> {
    //     return this.appService.getall();
    // }
}
