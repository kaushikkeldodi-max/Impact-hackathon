import { Injectable } from '@nestjs/common';
import { appState } from '../data/demo-data.js';

@Injectable()
export class NotificationsService {
  getNotifications() {
    return appState.notifications;
  }

  markRead(id: string) {
    const notification = appState.notifications.find((item) => item.id === id);
    if (!notification) {
      return null;
    }

    notification.read = true;
    return notification;
  }
}
