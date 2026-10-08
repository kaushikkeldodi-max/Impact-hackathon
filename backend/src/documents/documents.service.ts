import { Injectable } from '@nestjs/common';
import { appState } from '../data/demo-data.js';
import { DocumentUploadDto } from './dto/document-upload.dto.js';

@Injectable()
export class DocumentsService {
  getDocuments() {
    return appState.applicant.documents;
  }

  uploadDocument(dto: DocumentUploadDto) {
    const id = `doc-${Date.now()}`;
    const document = {
      id,
      name: dto.name,
      type: dto.type,
      uploadDate: new Date().toISOString().slice(0, 10),
      status: (dto.status as any) ?? 'UPLOADED',
      extractionStatus: 'PROCESSING',
      verificationStatus: 'Pending review',
      confidence: dto.confidence ?? 83,
      detectedInformation: ['Document uploaded and queued for extraction'],
      issues: [],
    };

    appState.applicant.documents.push(document);
    return document;
  }
}
