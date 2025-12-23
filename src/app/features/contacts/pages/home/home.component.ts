import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-home',
  imports: [
    ButtonModule,
    TableModule,
    CommonModule,
    OverlayBadgeModule

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  unreadCount = 0;

  public constructor(
    private notificationService : NotificationService
  ){

  }

  ngOnInit(): void {
     this.notificationService.unreadCount$.subscribe(count => {
      this.unreadCount   = count;
     })
  }
  notifications : any[] = []
  showNotifications = false;
  columns: any[]=[
    {name:'Nombre'},
    {name:''}
  ];
data: any[] = [
    {
      name: "Gregor",
      actions: [
        { icon: 'pi pi-eye', tooltip: 'Ver',severity:'success' },
        { icon: 'pi pi-pencil', tooltip: 'Editar' ,severity:'info'},
        { icon: 'pi pi-trash', tooltip: 'Eliminar',severity:'danger' }
      ]
    },
    {
      name: "Alice",
      actions: [
        { icon: 'pi pi-eye', tooltip: 'Ver',severity:'success' },
        { icon: 'pi pi-pencil', tooltip: 'Editar',severity:'info' },
        { icon: 'pi pi-trash', tooltip: 'Eliminar',severity:'danger' }
      ]
    }
  ];

  loadNotifications(){
    this.notificationService.getNotifications().subscribe(
      response => {
        console.log("respuesta del back", response)
        this.notifications = response.data.notifications
        this.unreadCount = response.data.unread_count
      }
    )
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.loadNotifications();
    }
  }
  

}
