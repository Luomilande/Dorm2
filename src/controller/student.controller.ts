import { Controller, Post, Body, Get } from '@nestjs/common';
import { DbService } from '../service/db.service';
import { Equal } from 'typeorm';
import { StudentInfo } from '../entities/StudentInfo';

@Controller("StudentMan")
export class StudentManController {
    constructor(private readonly db: DbService) { }


    @Get('GetList')
    async GetList(): Promise<any> {
        //let dorm= await this.db.studentInfo.update({})
        let result = await this.db.studentInfo.find({
            order: {
                id: "DESC"
            },
            take: 10
        });
        return JSON.stringify(result)
    }
    @Post('Search')
    async Search(@Body() student: StudentInfo): Promise<any> {
        //let dorm= await this.db.studentInfo.update({})
        if (student) {
            let result = await this.db.studentInfo.findOne({
                StudentId: Equal(student.StudentId)
            })
            return JSON.stringify(result)

        }
        return JSON.stringify({ code: 200, message: 0 })
    }

    @Post('StudentAdd')
    async AdminAdd(@Body() student: StudentInfo): Promise<any> {
        //let dorm= await this.db.studentInfo.update({})
        if (student) {
            let result = await this.db.studentInfo.findOne({ StudentId: Equal(student.StudentId) })
            if (result) {
                result.Class = student.Class;
                result.Name = student.Name;
                result.DormId = student.DormId;
                result.StudentId = student.StudentId;
                await this.db.studentInfo.save(result);
            } else {
                let entity = this.db.studentInfo.create(student);
                await this.db.studentInfo.insert(entity);
            }

            return JSON.stringify({ code: 200, message: 1 })
        }
        return JSON.stringify({ code: 200, message: 0 })
    }

    @Post('DeleteInfo')
    async DeleteInfo(@Body() student: StudentInfo): Promise<any> {
        
        if (student && student.StudentId) {
            let entity = this.db.studentInfo.create(student);
            this.db.studentInfo.delete(entity);
            return JSON.stringify({ code: 200, message: 1 })
        }
        return JSON.stringify({ code: 200, message: 0 })
    }
}
