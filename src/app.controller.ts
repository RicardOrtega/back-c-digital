import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('check-db')
  async checkDatabaseConnection(): Promise<{ ok: boolean; error?: string }> {
    return this.appService.checkDatabaseConnection();
  }



}
