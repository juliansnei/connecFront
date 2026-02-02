import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { IndicatorService } from "./services/indicatos.services";

@Injectable({providedIn:'root'})

export class IndicatorFacade {

    private indicatorService  = inject(IndicatorService);


    private _indicators = signal<any[]>([]);
    readonly indicator = this._indicators.asReadonly();
    private _indicatorEmployees = signal<any>([]);
    readonly indicatorEmployees = this._indicatorEmployees.asReadonly();
    private _indicatorParametrizations = signal<any[]>([]);
    readonly indicatorParametrizations =this._indicatorParametrizations.asReadonly();


    
    loadIndicators(){
       this.indicatorService.getAll().subscribe({
        next: (resp) => {
            console.log("respuesta del back",resp);
            const newData = resp.data;
            this._indicators.set(newData);

        },error:(erro) => {
            console.error("Error al obtener los indicadores",erro);
        }
       })
    }

}