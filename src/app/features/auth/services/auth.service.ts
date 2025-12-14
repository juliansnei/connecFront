import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { merge, Observable } from "rxjs";
import { AuhtRequest, AuthResponseModel } from "../models/auth.models";

@Injectable({
    providedIn:'root'
})

export class AuthService {

    private BASE_URL = `${environment.apiUrl}`
    private http = inject(HttpClient);

    login(request:AuhtRequest):Observable<AuthResponseModel>{
     return this.http.post<AuthResponseModel>(`${this.BASE_URL}/login`,request)
    }

    getToken(){
        return localStorage.getItem('token')
    }

    setToken(token:string){
        localStorage.setItem('token',token);
    }



    remokeToken(){
        localStorage.removeItem('token')
    }
}