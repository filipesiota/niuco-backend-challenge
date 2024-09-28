import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './interfaces/app.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users')
  async getUsers(): Promise<User[]> {
    return await this.appService.getUsers();
  }
}
