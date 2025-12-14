import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteManagerService {

  constructor(private route:Router) { }

  public navigateToRoute(route:string){
     return this.route.navigate([route]);
  }
}
