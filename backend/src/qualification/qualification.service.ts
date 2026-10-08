import { Injectable } from '@nestjs/common';
import { appState } from '../data/demo-data.js';

@Injectable()
export class QualificationService {
  getQualification() {
    const applicant = appState.applicant;
    const { qualification } = applicant;

    return {
      status: qualification.status,
      score: qualification.score,
      matched: qualification.matched,
      missing: qualification.missing,
      unverified: qualification.unverified,
      explanation:
        'Preliminary Qualification Assessment: Applicant appears to satisfy the core educational and experience requirements, but German language certification and document verification remain outstanding.',
      summary: {
        goal: applicant.primaryGoal,
        city: applicant.preferredCity,
        education: applicant.education.degree,
        experience: applicant.employment.relevantExperience,
      },
    };
  }
}
