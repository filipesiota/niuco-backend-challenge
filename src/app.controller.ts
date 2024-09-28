import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { APIResponse, User } from './interfaces/app.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users')
  async getUsers(): Promise<APIResponse<User[]>> {
    try {
      const users = await this.appService.getUsers();

      return {
        success: true,
        data: users
      }
    } catch (error) {
      console.log(error);

      return {
        success: false,
        error: {
          code: "ER01",
          message: "Failed to get users from external API"
        },
        data: []
      }
    }
  }
}
