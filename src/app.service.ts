import { Injectable } from '@nestjs/common';
import { User, UserExternal } from './interfaces/app.interface';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getUsers(): Promise<User[]> {
    const { data } = await firstValueFrom(
      this.httpService.get(`${process.env.API_MOCK_URL}/users`),
    );

    return this.transformUsers(data);
  }

  private transformUsers(users: UserExternal[]): User[] {
    return users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: this.obfuscateEmail(user.email),
        lastActivity: new Date(user.last_activity * 1000).toISOString(),
        isPayer: this.isPayer(user),
        isActive: user.status === 'enabled',
      };
    });
  }

  private obfuscateEmail(email: string): string {
    const [user, domain] = email.split('@');

    if (domain === 'niuco.com.br') {
      return email;
    }

    let leaveCharacters = 2;

    if (user.length < 2) {
      leaveCharacters = 0;
    } else if (user.length < 4) {
      leaveCharacters = 1;
    }

    const firstLetters = user.slice(0, leaveCharacters);
    const lastLetters = user.slice(-leaveCharacters);
    const obfuscation = '*'.repeat(user.length - leaveCharacters * 2);

    return `${firstLetters}${obfuscation}${lastLetters}@${domain}`;
  }

  private isPayer({ status, role }: UserExternal): boolean {
    if (status === 'disabled') {
      return false;
    }

    switch (role) {
      case 'admin':
      case 'editor':
        return true;

      case 'system':
      case 'viewer':
        return false;

      default:
        return false;
    }
  }
}
