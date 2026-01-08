import { TableActions, TableColumn } from "../models/table-columns.model";

export const COLUMNS_TABLE:TableColumn[] =[
    {
        field:'nombre',header:'Nombre',type:'text'
    }
    ,
    
    {field:'correo',header:'Correo electronico',type:'text'},
    {field:'descripcion',header:'Descripcion',type:'text'},
    {field:'telefono',header:'Telefono',type:'number'},
    {
        field:'apellido',header:'Apellido',type:'text',

    },
    {field:'',header:'',type:'text'}
]

export const ACTIOS_TABLE:TableActions[] =[
    {label:'Editar',icon:'pi pi-pencil',severity:'primary',actions:'edit'},
    {label:'Detalles',icon:'pi pi-info-circle',severity:'info',actions:'show'},
    {label:'Eliminar',icon:'pi pi-trash',severity:'danger',actions:'delete'}
]