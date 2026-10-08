import { Injectable } from '@nestjs/common';
import { appState } from '../data/demo-data.js';
import { ProfileUpdateDto } from './dto/profile-update.dto.js';

@Injectable()
export class ApplicantsService {
  getProfile() {
    return appState.applicant;
  }

  updateProfile(dto: ProfileUpdateDto) {
    const applicant = appState.applicant;

    appState.applicant = {
      ...applicant,
      ...dto,
      education: { ...applicant.education, ...(dto.education ?? {}) },
      employment: { ...applicant.employment, ...(dto.employment ?? {}) },
      skills: dto.skills ?? applicant.skills,
      motivation: dto.motivation ?? applicant.motivation,
      completeness: Math.min(100, Math.max(50, applicant.completeness + 5)),
    };

    return appState.applicant;
  }
}
