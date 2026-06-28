import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  getHello(): string {
    return 'Hello World!';
  }

  async onModuleInit() {
    try {
      await this.dataSource.query('SELECT 1');
      console.log('DB connected ✔');
    } catch (err: any) {
      console.log('DB connection failed ❌', err.message);
    }
  }
}