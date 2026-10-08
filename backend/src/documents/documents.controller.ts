import { Body, Controller, Get, Post } from '@nestjs/common';
import { DocumentsService } from './documents.service.js';
import { DocumentUploadDto } from './dto/document-upload.dto.js';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  getDocuments() {
    return this.documentsService.getDocuments();
  }

  @Post('upload')
  uploadDocument(@Body() dto: DocumentUploadDto) {
    return this.documentsService.uploadDocument(dto);
  }
}
