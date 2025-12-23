import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { BehaviorSubject, interval, Observable, switchMap, tap } from "rxjs";

@Injectable({providedIn:'root'})


export class NotificationService {

    private http = inject(HttpClient);
    private BASE_URL = `${environment.apiUrl}/notificaciones`;

    private unreadNotification  = new BehaviorSubject<number>(0);
    public unreadCount$ = this.unreadNotification.asObservable();

    public constructor(){
        this.startPolling();
    }

     private startPolling() {
    interval(30000) // 30 segundos
      .pipe(switchMap(() => this.countNotifications()))
      .subscribe();
  }

    getNotifications(){
        return this.http.get<any>(`${this.BASE_URL}`).pipe(
            tap(response => this.unreadNotification.next(response.data))
        )
    }

    public countNotifications():Observable<any>{
        return this.http.get<any>(`${this.BASE_URL}/no-leidas`).pipe(
            tap(response => this.unreadNotification.next(response.data))
        );
    }
}