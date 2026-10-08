import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApplicantsService } from './applicants.service.js';
import { ProfileUpdateDto } from './dto/profile-update.dto.js';

@Controller('applicants')
export class ApplicantsController {
  constructor(private readonly applicantsService: ApplicantsService) {}

  @Get('profile')
  getProfile() {
    return this.applicantsService.getProfile();
  }

  @Patch('profile')
  updateProfile(@Body() dto: ProfileUpdateDto) {
    return this.applicantsService.updateProfile(dto);
  }
}
