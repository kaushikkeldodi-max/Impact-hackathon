import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { randomBytes, scrypt, scryptSync, timingSafeEqual } from 'node:crypto';
import {
  activityLog,
  appState,
  checklistItems,
  demoUser,
  journeyStages,
  roadmapItems,
  sourceRecommendations,
} from './data/demo-data.js';
import { ProfileUpdateDto } from './applicants/dto/profile-update.dto.js';
import { DocumentUploadDto } from './documents/dto/document-upload.dto.js';
import { LoginDto } from './auth/dto/login.dto.js';
import { RegisterUserDto } from './auth/dto/register-user.dto.js';

type PublicUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
};

type StoredUser = PublicUser & { passwordHash: string };

const scryptOptions = { N: 16_384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };
const passwordKeyLength = 64;

function derivePasswordKey(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, passwordKeyLength, scryptOptions, (error, key) => {
      if (error) reject(error);
      else resolve(key);
    });
  });
}

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await derivePasswordKey(password, salt);
  return `scrypt$${salt.toString('base64url')}$${key.toString('base64url')}`;
}

async function verifyPassword(password: string, passwordHash: string): Promise<boolean> {
  const [algorithm, saltValue, keyValue] = passwordHash.split('$');
  if (algorithm !== 'scrypt' || !saltValue || !keyValue) return false;

  const salt = Buffer.from(saltValue, 'base64url');
  const expectedKey = Buffer.from(keyValue, 'base64url');
  if (salt.length !== 16 || expectedKey.length !== passwordKeyLength) return false;

  const actualKey = await derivePasswordKey(password, salt);
  return timingSafeEqual(actualKey, expectedKey);
}

@Injectable()
export class AppService {
  private readonly users = new Map<string, StoredUser>();

  constructor() {
    const demoSalt = randomBytes(16);
    this.users.set(demoUser.email, {
      id: demoUser.id,
      name: demoUser.name,
      email: demoUser.email,
      phone: demoUser.phone,
      country: demoUser.country,
      passwordHash: `scrypt$${demoSalt.toString('base64url')}$${scryptSync('Demo@123', demoSalt, passwordKeyLength, scryptOptions).toString('base64url')}`,
    });
  }

  getHello(): string {
    return 'Hello World!';
  }

  async login(dto: LoginDto) {
    const user = this.users.get(dto.email?.trim().toLowerCase());
    if (!user || typeof dto.password !== 'string' || !(await verifyPassword(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Email or password is incorrect.');
    }

    this.activateUser(user);
    return { token: `demo-session-${user.id}`, user: this.publicUser(user) };
  }

  async register(dto: RegisterUserDto) {
    const name = dto.fullName?.trim();
    const email = dto.email?.trim().toLowerCase();
    const password = dto.password;
    if (!name || !email || typeof password !== 'string' || password.length < 8) {
      throw new BadRequestException('Name, email, and a password of at least 8 characters are required.');
    }
    if (this.users.has(email)) {
      throw new ConflictException('An account with this email already exists.');
    }

    const user: StoredUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone: dto.phone?.trim() ?? '',
      country: dto.country?.trim() ?? '',
      passwordHash: await hashPassword(password),
    };
    this.users.set(email, user);
    this.activateUser(user);
    return { token: `demo-session-${user.id}`, user: this.publicUser(user) };
  }

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

  getJourney() {
    const stages = journeyStages.map((stage) => ({ ...stage, completed: stage.status === 'Completed' }));
    return {
      applicantName: appState.applicant.fullName,
      goal: appState.applicant.primaryGoal,
      stages,
      completion: Math.round((stages.filter((stage) => stage.completed).length / stages.length) * 100),
    };
  }

  getRoadmap() {
    return {
      title: 'Your Germany Journey',
      applicantGoal: appState.applicant.primaryGoal,
      phases: roadmapItems.map((phase) => ({ ...phase, tasks: [...phase.tasks] })),
    };
  }

  getChecklist() {
    return checklistItems;
  }

  getDocuments() {
    return appState.applicant.documents;
  }

  uploadDocument(dto: DocumentUploadDto) {
    const name = dto.name?.trim();
    const type = dto.type?.trim();
    if (!name || !type) {
      throw new BadRequestException('A document name and type are required.');
    }

    const document = {
      id: `doc-${Date.now()}`,
      name,
      type,
      uploadDate: new Date().toISOString().slice(0, 10),
      status: 'UPLOADED' as const,
      extractionStatus: 'PROCESSING',
      verificationStatus: 'Pending review',
      confidence: 83,
      detectedInformation: ['Document uploaded and queued for extraction'],
      issues: [],
    };
    appState.applicant.documents.push(document);
    return document;
  }

  getQualification() {
    const applicant = appState.applicant;
    return {
      ...applicant.qualification,
      explanation: 'Your education and experience are a strong match. German language certification and document verification are the next steps.',
      summary: {
        goal: applicant.primaryGoal,
        city: applicant.preferredCity,
        education: applicant.education.degree,
        experience: applicant.employment.relevantExperience,
      },
    };
  }

  getSources() {
    return sourceRecommendations.map((source) => ({
      ...source,
      whyRelevant: `${source.whyRelevant} This recommendation aligns with your ${appState.applicant.primaryGoal.toLowerCase()} goal in ${appState.applicant.preferredCity}.`,
    }));
  }

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

  getNotifications() {
    return appState.notifications;
  }

  markNotificationRead(id: string) {
    const notification = appState.notifications.find((item) => item.id === id);
    if (!notification) {
      throw new NotFoundException('Notification not found.');
    }
    notification.read = true;
    return notification;
  }

  orchestrate() {
    return {
      status: 'ok',
      message: 'Your profile, documents, qualification, and roadmap are up to date.',
      applicant: appState.applicant.fullName,
      nextAction: 'Complete the German language requirement before your final consultation.',
      activity: activityLog,
      modules: ['Profile', 'Documents', 'Qualification', 'Roadmap', 'Notifications'],
    };
  }

  private activateUser(user: StoredUser) {
    appState.applicant.fullName = user.name;
    appState.applicant.email = user.email;
    appState.applicant.phone = user.phone;
    appState.applicant.country = user.country;
  }

  private publicUser(user: StoredUser): PublicUser {
    const { id, name, email, phone, country } = user;
    return { id, name, email, phone, country };
  }
}
