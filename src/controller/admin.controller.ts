import { Controller, Post, Body, Get, Res, HttpStatus, Req } from '@nestjs/common';
import { DbService } from '../service/db.service';
import { AdminInfo } from '../entities/AdminInfo';
import { Equal } from 'typeorm';
import { Conf } from '../units/conf';
import { Response, Request } from 'express';

@Controller("AdminMan")
export class AdminManController {
    constructor(private readonly db: DbService) { }


    @Get('GetList')
    async GetList(): Promise<any> {
        //let dorm= await this.db.studentInfo.update({})
        let result = await this.db.adminInfo.find({
            order: {
                id: "DESC"
            },
            take: 10
        });
        return JSON.stringify(result)
    }
    @Post('Search')
    async Search(@Body() admin: AdminInfo): Promise<any> {
        //let dorm= await this.db.studentInfo.update({})
        if (admin) {
            let result = await this.db.adminInfo.findOne({
                JobNumber: Equal(admin.JobNumber)
            });
            result.Password = null;
            return JSON.stringify(result)

        }
        return JSON.stringify({ code: 200, message: 0 })
    }

    @Post('AdminAdd')
    async AdminAdd(@Body() admin: AdminInfo): Promise<any> {
        //let dorm= await this.db.studentInfo.update({})
        if (admin && admin.JobNumber) {
            let result = await this.db.adminInfo.findOne({ JobNumber: Equal(admin.JobNumber) })
            if (result) {
                result.Account = admin.Account || null;
                result.PhoneNumber = admin.PhoneNumber || null;
                result.Remarks = admin.Remarks || null;
                result.Name = admin.Name || null;
                //result.JobNumber = admin.JobNumber;
                //result.Password = admin.Password;
                //result.id = admin.id;
                await this.db.adminInfo.save(result);
            } else {
                if (!admin.Password) return JSON.stringify({ code: 200, message: 0 });
                let entity = this.db.adminInfo.create(admin);
                await this.db.adminInfo.insert(entity);
            }

            return JSON.stringify({ code: 200, message: 1 })
        }
        return JSON.stringify({ code: 200, message: 0 })
    }

    @Post('DeleteInfo')
    async DeleteInfo(@Body() admin: AdminInfo): Promise<any> {

        if (admin && admin.JobNumber && admin.Password) {
            let result = await this.db.adminInfo.findOne({
                where: { JobNumber: Equal(admin.JobNumber), Password: Equal(admin.Password) }
            });
            if (result) {
                this.db.adminInfo.delete(result);
                return JSON.stringify({ code: 200, message: 1 })
            }
        }
        return JSON.stringify({ code: 200, message: 0 })
    }

    @Post('Login')
    async Login(@Body() admin: AdminInfo, @Res() res: Response): Promise<any> {
        res.status(HttpStatus.OK);
        if (admin && admin.JobNumber && admin.Password) {
            let result = await this.db.adminInfo.findOne({
                where: { JobNumber: Equal(admin.JobNumber) }
            });
            if (result && result.Password == admin.Password) {
                let cookie = "token--" + Date.now().toString() + "--token";
                Conf.setToken(cookie, result);
                res.cookie('token', cookie, { maxAge: 365 * 24 * 60 * 1000, httpOnly: true });
                res.end(JSON.stringify({ code: 200, message: 1 }));
            }
        }
        res.end(JSON.stringify({ code: 200, message: 0 }));
    }

    @Get('Logout')
    async Logout(@Req() req: Request, @Res() res: Response): Promise<any> {
        Conf.removeToken(req.cookies.token);
        res.clearCookie('token');
        res.redirect("/login.html");
    }

}
