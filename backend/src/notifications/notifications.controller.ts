import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { NotificationsService } from './notifications.service.js';
import { MarkReadDto } from './dto/mark-read.dto.js';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  getNotifications() {
    return this.notificationsService.getNotifications();
  }

  @Patch(':id/read')
  markRead(@Param('id') id: string, @Body() _dto: MarkReadDto) {
    return this.notificationsService.markRead(id);
  }
}
