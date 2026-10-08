import { Controller, Get } from '@nestjs/common';
import { RoadmapService } from './roadmap.service.js';

@Controller('roadmap')
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @Get()
  getRoadmap() {
    return this.roadmapService.getRoadmap();
  }
}
