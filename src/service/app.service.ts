import { Injectable } from '@nestjs/common';
import { AdminInfo } from '../entities/AdminInfo'
import { DbService } from './db.service';

@Injectable()
export class AppService {
    constructor( private readonly db:DbService) { }

    async getall(): Promise<AdminInfo[]> {
        return this.db.adminInfo.find();
    }
}