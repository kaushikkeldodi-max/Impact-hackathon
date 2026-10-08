import { Controller, Get } from '@nestjs/common';
import { QualificationService } from './qualification.service.js';

@Controller('qualification')
export class QualificationController {
  constructor(private readonly qualificationService: QualificationService) {}

  @Get()
  getQualification() {
    return this.qualificationService.getQualification();
  }
}
