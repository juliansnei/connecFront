import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { Observable } from "rxjs";

@Injectable({providedIn:'root'})

export class UserService {

    private http  = inject(HttpClient);
    private BASE_URL = `${environment.apiUrl}/users`

    public getAll():Observable<any>{
        return this.http.get<any>(`${this.BASE_URL}`);
    }
}