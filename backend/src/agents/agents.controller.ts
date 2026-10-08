import { Controller, Post } from '@nestjs/common';
import { AgentsService } from './agents.service.js';

@Controller('agent')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post('orchestrate')
  orchestrate() {
    return this.agentsService.orchestrate();
  }
}
