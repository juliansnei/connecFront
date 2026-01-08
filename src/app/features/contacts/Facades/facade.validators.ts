import { inject, Injectable } from "@angular/core";
import { FormField } from "../models/form-fields.model";
import { Validators } from "@angular/forms";
import { ValidationService } from "../../../core/services/validation.service";
import { find } from "rxjs";

@Injectable({providedIn:'root'})

export class FacadaValidatos{

    private validatiorService = inject(ValidationService)

    buildValidators(field:FormField['validations'])
    {
        const fns = [];
        if(!field)return;

        if(field.required){
            fns.push(this.validatiorService.required())
        }
        if(field.minLength){
            fns.push(this.validatiorService.minLength(field.minLength))
        }
        if(field.maxLength){
            fns.push(this.validatiorService.maxLength(field.maxLength))
        }
        if(field.email){
            fns.push(this.validatiorService.email())
        }
        return fns;

    }
}