export class ProfileUpdateDto {
  primaryGoal?: string;
  preferredField?: string;
  preferredCity?: string;
  intakePeriod?: string;
  currentQualification?: string;
  careerGoal?: string;
  education?: Record<string, string>;
  employment?: Record<string, string | string[]>;
  skills?: string[];
  motivation?: string;
}
