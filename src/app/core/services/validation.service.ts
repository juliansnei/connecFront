import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

@Injectable({providedIn:'root'})


export class ValidationService {

    required():ValidatorFn{
     return (control:AbstractControl):ValidationErrors | null =>{
        return control.value ? null :{required:true}
     }
    }
    minLength(length:number):ValidatorFn{
        return(control:AbstractControl):ValidationErrors | null => {
            if(!control.value) return null;
            return control.value.length >= length
            ? null
            :{minLength:{requiredLength:length}}

        }

    }
    maxLength(length:number):ValidatorFn{
        return (control:AbstractControl):ValidationErrors | null  => {
             if(!control.value) return null;
             return control.value.length <= length
             ?null
             :{maxLength:{requiredLength:length}}
        }
    }
    email():ValidatorFn{
        return (control:AbstractControl):ValidationErrors | null => {
            if(!control.value) return null;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(control.value)
      ? null
      : {email:true}
            }
    }

    getErrorsMessage(control:AbstractControl | null):string | null
    {
        if(!control) return null;
        const errors = control.errors;
        if(!errors || !control.touched)return null;

        if(errors['required']) return 'Campo requerido';
        if(errors['email']) return 'Emial no valido';
        if(errors['minLength']) return 'No cumple minimo caracteres'
        if(errors['maxLength']) return 'No cumple maximo de caracteres'
        
        return null;
 
    }

    
}