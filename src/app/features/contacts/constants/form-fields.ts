import { FormField } from "../models/form-fields.model";

export  const FORM_FIELDS:FormField[] = [
    {
    name:'name',
    label:'Nombre',
    type:'text',
    placeholder:'Pepito',
    validations:{
    required:true,
    minLength:5
    }

},
    {
    name:'lastname',
    label:'Apellido',
    type:'text',
    placeholder:'Perez',
    validations:{
    required:false,
    minLength:5
    }

},
    {
    name:'description',
    label:'Descripcion',
    type:'text',
    placeholder:'Escribe una descripcion',
    validations:{
    required:false,
    minLength:5,
    maxLength:20
    }

},
 {
    name:'phone',
    label:'Telefono',
    type:'number',
    placeholder:'54147512 45544',
    validations:{
    required:true,
    minLength:10
    }

},
 {
    name:'email',
    label:'Correo electronico',
    type:'email',
    placeholder:'emailQexample.com',
    validations:{
    required:true,
    email:true
    }

},

]