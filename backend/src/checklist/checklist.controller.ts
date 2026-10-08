import { Controller, Get } from '@nestjs/common';
import { ChecklistService } from './checklist.service.js';

@Controller('checklist')
export class ChecklistController {
  constructor(private readonly checklistService: ChecklistService) {}

  @Get()
  getChecklist() {
    return this.checklistService.getChecklist();
  }
}
