import { Controller, Get, Render, Post } from '@nestjs/common';
import { DbService } from '../service/db.service';
import { LessThanOrEqual, MoreThan } from 'typeorm';
import { DateEx } from '../units/extends'
import { TestInfo } from "../dto/TestInfo"

@Controller("Home")
export class HomeController {
    constructor(private readonly db: DbService) { }

    @Get('Totaldata')
    async Totaldata(): Promise<any> {
        let jet = { VisitNumber: 0, ToolNumber: 0, NoticeNumber: 0, LiveNumber: 0 }
        jet.VisitNumber = await this.db.visitInfo.count();
        jet.NoticeNumber = await this.db.noticeInfo.count();
        jet.LiveNumber = await this.db.studentInfo.count();
        let dorm = await this.db.dormInfo.findOne();
        jet.ToolNumber += dorm.Water;
        jet.ToolNumber += dorm.Trash;
        jet.ToolNumber += dorm.Mop;
        jet.ToolNumber += dorm.Broom;
        return JSON.stringify(jet);
    }

    @Get('TestInfo')
    async TestInfo(): Promise<any> {
        let maxdate = new DateEx();
        let mindate = new DateEx();
        mindate.setDate(mindate.getDate() - 7);
        let rows = await this.db.visitInfo.find({
            where: [
                { DateTime: LessThanOrEqual(`${maxdate.Format("yyyy-MM-dd")}`) },
                { DateTime: MoreThan(`${maxdate.Format("yyyy-MM-dd")}`) }
            ]
        });
        let result = new Array();
        let curTestInfo = null;
        for (let i = 0; i < 7; i++) {
            let curDate = maxdate.Format("yyyy-MM-dd");
            curTestInfo = new TestInfo();
            await rows.forEach(element => {
                if (curDate == new DateEx(element.DateTime).Format("yyyy-MM-dd")) {
                    if (element.InOut === 1) curTestInfo.InNumber += 1;
                    if (element.InOut === 0) curTestInfo.OutNumber += 1;
                }
            });
            curTestInfo.DateTime = curDate;
            result.push(curTestInfo);
            maxdate.setDate(maxdate.getDate() - 1);
        }
        if (curTestInfo) result.push(curTestInfo);
        return JSON.stringify(result);
    }
}
