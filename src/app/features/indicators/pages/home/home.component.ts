import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {CardModule} from 'primeng/card';
import { CustomModalComponent } from '../../../../core/shared/components/custom-modal/custom-modal.component';
import { CONFIG_MODAL_INDICATOR } from '../../const/config-custom-modal';
import { IndicatorFacade } from '../../indicators.facade';
import { CommonModule } from '@angular/common';
import { UsersFacade } from '../../../../core/shared/facades/user.facade';

@Component({
  selector: 'app-home',
  imports: [CardModule,ButtonModule,CustomModalComponent,CommonModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.indicatorFacade.loadIndicators();
    this.userFacade.loadUser()
  }

  openModal = signal<boolean>(false);
  modalConfig = CONFIG_MODAL_INDICATOR;

  

//facades o services
private indicatorFacade = inject(IndicatorFacade);
private userFacade = inject(UsersFacade);

  users = this.userFacade.users



indicators = this.indicatorFacade.indicator;

  showModal(indicator:any){
    console.log("abriendo el modal");
    this.modalConfig = {
      ...CONFIG_MODAL_INDICATOR,
      title: 'indicador bla bla',
      listData: this.users(),
      selectedIds:indicator.empleados.map((u:any) => u.id)
    }
    this.openModal.set(true);
  }

}
