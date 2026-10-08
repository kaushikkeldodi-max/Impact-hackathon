import { Injectable } from '@nestjs/common';
import { appState } from '../data/demo-data.js';

@Injectable()
export class CvService {
  getCv() {
    const applicant = appState.applicant;
    return {
      name: applicant.fullName,
      email: applicant.email,
      phone: applicant.phone,
      summary: applicant.motivation,
      skills: applicant.skills,
      education: `${applicant.education.degree} in ${applicant.education.field} from ${applicant.education.institution}`,
      experience: `${applicant.employment.jobTitle} at ${applicant.employment.employer}`,
      status: 'Ready for review',
      version: 'v1',
    };
  }
}
