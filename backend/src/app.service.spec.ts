import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service.js';

describe('AppService password handling', () => {
  let service: AppService;

  beforeEach(() => {
    service = new AppService();
  });

  it('accepts the demo account password', async () => {
    const result = await service.login({
      email: ' DEMO.APPLICANT@EXAMPLE.COM ',
      password: 'Demo@123',
    });

    expect(result.user.email).toBe('demo.applicant@example.com');
    expect(result.token).toBeTruthy();
  });

  it('rejects an incorrect password', async () => {
    await expect(
      service.login({ email: 'demo.applicant@example.com', password: 'incorrect' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('hashes new account passwords and verifies them on login', async () => {
    const account = {
      fullName: 'New Applicant',
      email: 'new.applicant@example.com',
      phone: '',
      password: 'CorrectHorseBatteryStaple',
      country: 'India',
      currentLocation: '',
    };

    await service.register(account);

    await expect(
      service.login({ email: account.email, password: account.password }),
    ).resolves.toMatchObject({ user: { email: account.email } });
    await expect(
      service.login({ email: account.email, password: 'wrong-password' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('rejects registration passwords shorter than eight characters', async () => {
    await expect(
      service.register({
        fullName: 'Short Password',
        email: 'short@example.com',
        phone: '',
        password: 'short',
        country: 'India',
        currentLocation: '',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
