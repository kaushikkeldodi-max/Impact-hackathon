import { Injectable } from '@nestjs/common';
import { appState, journeyStages } from '../data/demo-data.js';

@Injectable()
export class JourneyService {
  getJourney() {
    const stages = journeyStages.map((stage) => ({
      ...stage,
      completed: stage.status === 'Completed',
    }));

    return {
      applicantName: appState.applicant.fullName,
      goal: appState.applicant.primaryGoal,
      stages,
      completion: Math.round((stages.filter((stage) => stage.status === 'Completed').length / stages.length) * 100),
    };
  }
}
