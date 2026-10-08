import { Module } from '@nestjs/common';
import { ApplicantsController } from './applicants.controller.js';
import { ApplicantsService } from './applicants.service.js';

@Module({
  controllers: [ApplicantsController],
  providers: [ApplicantsService],
  exports: [ApplicantsService],
})
export class ApplicantsModule {}
