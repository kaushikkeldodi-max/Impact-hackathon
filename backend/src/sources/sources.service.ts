import { Injectable } from '@nestjs/common';
import { appState, sourceRecommendations } from '../data/demo-data.js';

@Injectable()
export class SourcesService {
  getSources() {
    const applicant = appState.applicant;
    return sourceRecommendations.map((source) => ({
      ...source,
      whyRelevant: `${source.whyRelevant} This recommendation specifically aligns with your ${applicant.primaryGoal.toLowerCase()} goal in ${applicant.preferredCity}.`,
    }));
  }
}
