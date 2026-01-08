import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }
  private http = inject(HttpClient)
  private BASE_URL = `${environment.apiUrl}/contactos`

  create(request:any):Observable<any>{
    return this.http.post<any>(`${this.BASE_URL}`,request)
  }
 getAll(filters?: { busqueda?: string }) {
  return this.http.get<any>(this.BASE_URL, {
    params: filters ?? {}
  });
}


  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${this.BASE_URL}/${id}`);
  }
  public update(id:number,request:any):Observable<any>{
    return this.http.put<any>(`${this.BASE_URL}/${id}`,{
      nombre:request.name,
      apellido:request.lastname,
      email:request.email,
      telefono:request.phone,
      descripcion:request.description
    })
  }
}
