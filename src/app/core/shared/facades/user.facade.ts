import { inject, Injectable, signal } from "@angular/core";
import { UserService } from "../../services/users.service";
import { StarFillIcon } from "primeng/icons";

    @Injectable({providedIn:'root'})


    export class UsersFacade {


        private userService = inject(UserService);

        private _users = signal<any>([]);
        readonly users = this._users.asReadonly();



        public loadUser  (){
            this.userService.getAll().subscribe({
                next: (respose) => {
                    console.log("respuesta del back", respose);
                    this._users.set(respose.data);

                },error: (error) => {
                    console.error("Eerror al traer users");
                }
            })
        }
    }