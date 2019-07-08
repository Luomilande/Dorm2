import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';

import { AdminInfo } from '../entities/AdminInfo';
import { DormInfo } from '../entities/DormInfo';
import { NoticeInfo } from '../entities/NoticeInfo';
import { VisitInfo } from '../entities/VisitInfo';
import { StudentInfo } from '../entities/StudentInfo';

@Injectable()
export class DbService {
    adminInfo: Repository<AdminInfo>;
    dormInfo: Repository<DormInfo>;
    noticeInfo: Repository<NoticeInfo>;
    studentInfo: Repository<StudentInfo>;
    visitInfo: Repository<VisitInfo>;
    constructor(private readonly Connection: Connection) {
        this.adminInfo = this.Connection.getRepository(AdminInfo);
        this.dormInfo = this.Connection.getRepository(DormInfo);
        this.noticeInfo = this.Connection.getRepository(NoticeInfo);
        this.studentInfo = this.Connection.getRepository(StudentInfo);
        this.visitInfo = this.Connection.getRepository(VisitInfo);
    }
}
