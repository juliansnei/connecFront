import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { OverlayBadgeModule } from 'primeng/overlaybadge';


@Component({
  selector: 'app-home',
  imports: [ButtonModule,
    TableModule,
    CommonModule,
    OverlayBadgeModule

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  columns: any[]=[
    {name:'Nombre'}
  ];
  data: any[]=[
    {name:"Gregor", email:"gregor@example.com"}
  ];

  

}
