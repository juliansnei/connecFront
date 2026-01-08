export interface TableColumn {
    field?:string,
    header?:string,
    type?: 'text'|'number'|'date'|'boolean'
    align?:'right'|'left'

}

export interface TableActions
{
    label?:string,
    icon?:string,
    actions: 'edit'|'delete'|'show'
    severity?:'primary'|'danger'|'info'|'secondary'|'contrast'

}