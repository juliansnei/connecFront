import { ButtonSeverity } from "primeng/button";

export interface CustomConfigModal 
{
    title?:string;
    description?:string;
    listData?:any[];
      selectedIds?: number[];
    buttons?:ButtonModel[]
    buttonsFooter?:ButtonModel[],
    checked?:boolean[]
    

}


export interface ButtonModel {
    icon?:string,
    title?:string,
    type?: 'button|icon|footer',
    severity:ButtonSeverity,


}