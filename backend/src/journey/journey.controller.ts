import { Controller, Get } from '@nestjs/common';
import { JourneyService } from './journey.service.js';

@Controller('journey')
export class JourneyController {
  constructor(private readonly journeyService: JourneyService) {}

  @Get()
  getJourney() {
    return this.journeyService.getJourney();
  }
}
