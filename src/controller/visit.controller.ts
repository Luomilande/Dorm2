import { Controller, Post, Body, Get } from '@nestjs/common';
import { DbService } from '../service/db.service';
import { DateEx } from '../units/extends';
import { VisitInfo } from '../entities/VisitInfo';
import { Like } from 'typeorm';

@Controller("Visit")
export class VisitController {
    constructor(private readonly db: DbService) { }


    @Get('GetList')
    async GetList(): Promise<any> {
        //let dorm= await this.db.studentInfo.update({})
        let result = await this.db.visitInfo.find({
            order: {
                id: "DESC"
            },
            take: 10
        });
        return JSON.stringify(result)
    }
    @Post('Search')
    async Search(@Body() visit: VisitInfo): Promise<any> {
        //let dorm= await this.db.studentInfo.update({})
        let result = await this.db.visitInfo.find({
            StudentName: Like(`%${visit.StudentName}%`)
        });
        return JSON.stringify(result)
    }
    @Post('AddVisit')
    async AddVisit(@Body() visit: VisitInfo): Promise<any> {
        //let dorm= await this.db.studentInfo.update({})
        if (visit) {
            visit.DateTime = new DateEx().Format("yyyy-MM-dd hh:mm:ss");
            let entity = this.db.visitInfo.create(visit);
            await this.db.visitInfo.insert(entity);
            return JSON.stringify({ code: 200, message: 1 })

        }
        return JSON.stringify({ code: 200, message: 0 })
    }
}
