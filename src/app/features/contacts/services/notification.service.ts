import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { BehaviorSubject, interval, Observable, switchMap, tap } from "rxjs";

@Injectable({providedIn:'root'})


export class NotificationService {

    private http = inject(HttpClient);
    private BASE_URL = `${environment.apiUrl}/notificaciones`;

    private unreadNotification  = new BehaviorSubject<number>(0);
    public unreadCount$ = this.unreadNotification.asObservable();
    unreadNotifications  = signal<any[]>([]);

    public constructor(){
        // this.startPolling();
    }

     private startPolling() {
    interval(5000) 
      .pipe(switchMap(() => this.countNotifications()))
      .subscribe();
  }

//obtener nofiticaciones
    getNotifications(){
        return this.http.get<any>(`${this.BASE_URL}/no-leidas`).subscribe(
            
                {
                    next: (response) => {
                        console.log("respuesta del back", response.data)
                        this.unreadNotifications.set(response.data) ?? [];
                    }
                }
        
        )
    }

    //contar notificaciones
    public countNotifications():Observable<any>{
        return this.http.get<any>(`${this.BASE_URL}/no-leidas`).pipe(
            tap(
                response => {
                    this.unreadNotification.next(response.total_unread)
                    console.log("Respuesta notificaciones no leidas:", response.total_unread)
                }
            )
        );
    }
    public maskAllAsRead():Observable<any>{
        return this.http.put<any>(`${this.BASE_URL}/marcar-leidas`,{})
    }
    
    public clearNotifications(){
        this.unreadNotifications.set([]);
    }
}