import { Injectable, UnauthorizedException } from '@nestjs/common';
import { appState, demoUser } from '../data/demo-data.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterUserDto } from './dto/register-user.dto.js';

@Injectable()
export class AuthService {
  login(dto: LoginDto) {
    if (dto.email !== demoUser.email || dto.password !== 'Demo@123') {
      throw new UnauthorizedException('Email or password is incorrect.');
    }
    return {
      token: `demo-session-${demoUser.id}`,
      user: {
        id: demoUser.id,
        name: demoUser.name,
        email: demoUser.email,
        phone: demoUser.phone,
        country: demoUser.country,
      },
    };
  }

  register(dto: RegisterUserDto) {
    return {
      token: `demo-session-${Date.now()}`,
      user: {
        id: `user-${Date.now()}`,
        name: dto.fullName,
        email: dto.email,
        phone: dto.phone,
        country: dto.country,
      },
    };
  }
}
