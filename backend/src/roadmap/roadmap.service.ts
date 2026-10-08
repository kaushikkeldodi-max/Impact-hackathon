import { Injectable } from '@nestjs/common';
import { appState, roadmapItems } from '../data/demo-data.js';

@Injectable()
export class RoadmapService {
  getRoadmap() {
    const isLanguagePending = appState.applicant.languages.german === 'A2';

    return {
      title: 'Your Germany Journey',
      applicantGoal: appState.applicant.primaryGoal,
      phases: roadmapItems.map((phase) => ({
        ...phase,
        tasks: isLanguagePending && phase.phase === 'Language'
          ? phase.tasks.map((task) => (task.includes('German') ? '⚠ German language requirement pending' : task))
          : phase.tasks,
      })),
    };
  }
}
