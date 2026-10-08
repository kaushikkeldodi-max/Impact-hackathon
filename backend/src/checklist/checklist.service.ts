import { Injectable } from '@nestjs/common';
import { checklistItems } from '../data/demo-data.js';

@Injectable()
export class ChecklistService {
  getChecklist() {
    return checklistItems;
  }
}
