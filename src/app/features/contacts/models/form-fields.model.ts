export interface FormField {
    name:string,
    label?:string,
    type?: 'text' | 'email'|'number'|'password'|'select',
    placeholder?:string;
    validations?:Validations;
    options?:{label:string,value:any}[]
}

export interface Validations{
    required?:boolean;
    minLength?:number;
    maxLength?:number;
    email?:boolean;
    pattern?:string
}