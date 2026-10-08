import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service.js';
import { ProfileUpdateDto } from './applicants/dto/profile-update.dto.js';
import { DocumentUploadDto } from './documents/dto/document-upload.dto.js';
import { LoginDto } from './auth/dto/login.dto.js';
import { RegisterUserDto } from './auth/dto/register-user.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/login')
  login(@Body() body: LoginDto) {
    return this.appService.login(body);
  }

  @Post('auth/register')
  register(@Body() body: RegisterUserDto) {
    return this.appService.register(body);
  }

  @Get('applicants/profile')
  getProfile() {
    return this.appService.getProfile();
  }

  @Patch('applicants/profile')
  updateProfile(@Body() body: ProfileUpdateDto) {
    return this.appService.updateProfile(body);
  }

  @Get('journey')
  getJourney() {
    return this.appService.getJourney();
  }

  @Get('roadmap')
  getRoadmap() {
    return this.appService.getRoadmap();
  }

  @Get('checklist')
  getChecklist() {
    return this.appService.getChecklist();
  }

  @Get('documents')
  getDocuments() {
    return this.appService.getDocuments();
  }

  @Post('documents/upload')
  uploadDocument(@Body() body: DocumentUploadDto) {
    return this.appService.uploadDocument(body);
  }

  @Get('qualification')
  getQualification() {
    return this.appService.getQualification();
  }

  @Get('sources')
  getSources() {
    return this.appService.getSources();
  }

  @Get('cv')
  getCv() {
    return this.appService.getCv();
  }

  @Get('notifications')
  getNotifications() {
    return this.appService.getNotifications();
  }

  @Patch('notifications/:id/read')
  markNotificationRead(@Param('id') id: string) {
    return this.appService.markNotificationRead(id);
  }

  @Post('agent/orchestrate')
  orchestrate() {
    return this.appService.orchestrate();
  }
}
