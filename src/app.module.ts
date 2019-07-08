import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { HomeController } from './controller/home.controller';
import { DormManController } from './controller/dorm.controller';
import { VisitController } from './controller/visit.controller';
import { AdminManController } from './controller/admin.controller';
import { StudentManController } from './controller/student.controller';
import { AppService } from './service/app.service';
import { DbService } from './service/db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
    imports: [TypeOrmModule.forRoot()],
    controllers: [
        AppController,
        HomeController,
        DormManController,
        VisitController,
        AdminManController,
        StudentManController
    ],
    providers: [AppService, DbService],
})
export class AppModule {
    constructor(private readonly Connection: Connection) { }
}
