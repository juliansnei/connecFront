import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

(window as any).Pusher = Pusher;
@Injectable({
  providedIn: 'root'
})
export class ReverbService {
  echo: any;

  constructor() {
    this.echo = new Echo({
      broadcaster: 'reverb',
      key: '4qm6fsezqggxbqovfrqw',
      wsHost: '127.0.0.1',
      wsPort: 8080,
      forceTLS: false,
      enabledTransports: ['ws'],
    });
  }

 listenToContacts(callback: (data: any) => void) {
  this.echo
    .channel('contactos')
    .listen('.contact.created', (event: any) => {
      callback(event);
    });
}

stopListening() {
  this.echo.leaveChannel('contactos');
}

}
