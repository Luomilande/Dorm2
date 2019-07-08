import { Controller, Get, Req, Post, Body } from '@nestjs/common';
import { DbService } from '../service/db.service';
import { Equal, Like } from 'typeorm';
import { StudentInfo } from '../entities/StudentInfo';
import { DormInfo } from '../entities/DormInfo';
import { NoticeInfo } from '../entities/NoticeInfo';
import { DateEx } from '../units/extends';

@Controller("DormMan")
export class DormManController {
    constructor(private readonly db: DbService) { }

    @Get('GetListNotice')
    async GetListNotice(): Promise<any> {
        return await this.db.noticeInfo.find({
            order: {
                id: "DESC"
            },
            take: 3
        })
    }

    @Get('GetTool')
    async GetTool(): Promise<any> {
        let result = await this.db.dormInfo.findOne();
        return JSON.stringify(result)
    }

    @Get('GetList')
    async GetList(): Promise<any> {
        let result = await this.db.studentInfo.find({
            order: {
                id: "DESC"
            },
            take: 10
        });
        return JSON.stringify(result)
    }

    @Post('DeleteInfo')
    async DeleteInfo(@Body() studentInfo: StudentInfo): Promise<any> {
        if (studentInfo.StudentId) {
            let result = await this.db.studentInfo.findOne({
                StudentId: Equal(studentInfo.StudentId)
            });
            if (result) {
                await this.db.studentInfo.delete(result)
                return JSON.stringify({ code: 200, message: 1 })
            }
        }
        return JSON.stringify({ code: 200, message: 0 });
    }

    @Post('Search')
    async Search(@Body() studentInfo: StudentInfo): Promise<any> {
        if (!studentInfo.DormId) return JSON.stringify({ code: 200, message: 0 });
        let result = await this.db.studentInfo.find({
            DormId: Equal(studentInfo.DormId)
        });
        return JSON.stringify(result)
    }

    @Post('GetInfo')
    async GetInfo(@Body() studentInfo: StudentInfo): Promise<any> {
        if (!studentInfo.StudentId) return JSON.stringify({ code: 200, message: 0 });
        let result = await this.db.studentInfo.findOne({
            StudentId: Equal(studentInfo.StudentId)
        });
        return JSON.stringify(result)
    }

    @Post('AddTool')
    async AddTool(@Body() dormInfo: DormInfo): Promise<any> {
        let dorm = await this.db.dormInfo.findOne();
        if (dorm) {
            dorm.Broom = dormInfo.Broom;
            dorm.Mop = dormInfo.Mop;
            dorm.Trash = dormInfo.Trash;
            dorm.Water = dormInfo.Water;
            await this.db.dormInfo.save(dorm);
        }
        return JSON.stringify({ code: 200, message: 1 })
    }

    @Post('DormAdd')
    async DormAdd(@Body() studentInfo: StudentInfo): Promise<any> {
        //let dorm= await this.db.studentInfo.update({})
        if (studentInfo) {
            let stu = await this.db.studentInfo.findOne({ StudentId: Equal(studentInfo.StudentId) });
            if (stu) {
                stu.DormId = studentInfo.DormId;
                await this.db.studentInfo.save(stu);
                return JSON.stringify({ code: 200, message: 1 });
            }
        }
        return JSON.stringify({ code: 200, message: 0 })
    }
    @Post('AddNotice')
    async AddNotice(@Body() notice: NoticeInfo): Promise<any> {
        //let dorm= await this.db.studentInfo.update({})
        if (notice) {
            notice.DateTime = new DateEx().Format("yyyy-MM-dd hh:mm:ss");
            let entity= this.db.noticeInfo.create(notice);
            await this.db.noticeInfo.insert(entity);
            return JSON.stringify({ code: 200, message: 1 })

        }
        return JSON.stringify({ code: 200, message: 0 })
    }

    @Post('SearchTool')
    async SearchTool(@Body() notice: NoticeInfo): Promise<any> {
        //let dorm= await this.db.studentInfo.update({})
        if (notice) {

            let result = await this.db.noticeInfo.find({
                Title: Like(`%${notice.Title}%`)
            });
            return JSON.stringify(result)

        }
        return JSON.stringify({ code: 200, message: 0 })
    }

}
