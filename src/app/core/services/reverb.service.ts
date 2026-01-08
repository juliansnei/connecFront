import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { every } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReverbService {
  echo: any;

  constructor() {
        (window as any).Pusher = Pusher;
    this.echo = new Echo({
      broadcaster: 'reverb',
      key: '4qm6fsezqggxbqovfrqw',
      wsHost: '127.0.0.1',
      wsPort: 8080,
      forceTLS: false,
      enabledTransports: ['ws'],
    });
  }

listenContactNotifications(callback: () => void) {
  const channel = this.echo.channel('contactos');

  channel.listen('.contact.created', () => callback());
  channel.listen('.contact.updated', () => callback());
  channel.listen('.contact.deleted', () => callback());
}


stopListening() {
  this.echo.leaveChannel('contactos');
}

}
