import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
@Injectable()
export class AppService {
 
 constructor(private dataSource: DataSource) {}
 
 
  getHello(): string {
    return 'Hello World!';
  }

  async checkDatabaseConnection(): Promise<{ ok: boolean; error?: string }> {
    try{
      await this.dataSource.query('SELECT 1');

    }
    catch(error: any) {
      return { ok: false, error: error?.message ?? String(error) 


      };
    }
  }
}
