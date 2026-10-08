import { Injectable } from '@nestjs/common';
import { activityLog, appState } from '../data/demo-data.js';

@Injectable()
export class AgentsService {
  orchestrate() {
    const applicant = appState.applicant;

    return {
      status: 'ok',
      message: 'The Journey Agent orchestrated the applicant assessment and updated the roadmap.',
      applicant: applicant.fullName,
      nextAction: 'Complete German language requirement before final consultation.',
      activity: activityLog,
      modules: ['Profile Agent', 'Document Agent', 'Verification Agent', 'Qualification Agent', 'Roadmap Agent', 'Notification Agent'],
    };
  }
}
