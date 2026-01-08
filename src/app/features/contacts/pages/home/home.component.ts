import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { NotificationService } from '../../services/notification.service';
import { ReverbService } from '../../../../core/services/reverb.service';
import { ContactFormModalComponent } from '../../components/contact-form-modal/contact-form-modal.component';
import { FormsModule } from '@angular/forms';
import { ContactFacade } from '../../Facades/contact-facade';
import { ACTIOS_TABLE, COLUMNS_TABLE } from '../../constants/columns-table';
import { CustomConfirmationService } from '../../../../core/services/custom-confirmation.service';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { ShowDetailsModalComponent } from '../../components/show-details/show-details-modal.component';


@Component({
  selector: 'app-home',
  imports: [
    ButtonModule,
    TableModule,
    CommonModule,
    OverlayBadgeModule,ContactFormModalComponent,FormsModule,OverlayPanelModule,ShowDetailsModalComponent

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  unreadCount = 0;
  showModal = signal<boolean>(false);
  showDetailsModal =signal<boolean>(false);

  private reverbService = inject(ReverbService)
  private contactFacade = inject(ContactFacade)
  private confirmationService = inject(CustomConfirmationService);
  private notificationService  = inject(NotificationService)

  @ViewChild('op') overlayPanel!: OverlayPanel;


  contacts = this.contactFacade.contacts;
  unreadCounts = this.contactFacade.unreadContacts;
  notifications  = this.notificationService.unreadNotifications;
  selectedContact = this.contactFacade.selectedContact;

   globalSearch = '';


  public constructor( ){

  }

  ngOnInit(): void {
    this.notificationService.getNotifications()
    this.contactFacade.loadingContact()

    this.notificationService.countNotifications().subscribe(
      count => this.contactFacade.setUnread(count.total_unread)
    )

   this.reverbService.listenContactNotifications(() => {
    this.contactFacade.increaseUnread();
  });
  }

   ngOnDestroy() {
    this.reverbService.stopListening();
  }
  showNotifications = false;
  columns = COLUMNS_TABLE;
  actionsTable = ACTIOS_TABLE;

  toggleNotifications(event: Event) {
  this.overlayPanel.toggle(event);
  this.notificationService.maskAllAsRead().subscribe({
    next:(response) =>{
      console.log("Marcadas como leidas", response)
      
    },error:(error) =>{
      console.error("Error al marcar como leidas",error);
    }

  })
  this.contactFacade.clearUnread();

  // Marcar como leídas cuando se abre
}
  openModal(){
  this.contactFacade.clearSelection()

    this.showModal.set(true);
  }
  openEditModal(selectContact:any){
    this.contactFacade.selectContact(selectContact);
    this.showModal.set(true);
  }
  handleSubmit(event:any){
  //  console.log("recibiendo valores del hijo",event)
  const contact = this.selectedContact();
  if(contact && contact.id){
    console.log("modo edicion",contact)
    this.contactFacade.update(contact.id,event.payload);
  }else{
  this.contactFacade.create(event.payload);

  }

  }
  closeModal(){
  this.showModal.set(false);

  }
  
  onAction(action:string,row:any){
      if (!action) return;
    switch (action){
      case 'edit':
       this.openEditModal(row);
        break;
        case 'delete':
          this.confirmDelete(row.id)
          break;
        case 'show':
          this.openModalDetails(row)
          break;
    }

  }
  delete(id:number){
    console.log("id", id)
    this.contactFacade.delete(id);
  }
    confirmDelete(id: number) {
  this.confirmationService.showDelete(
    'Si eliminas este contacto no podrás recuperarlo',
    () => {
      this.contactFacade.delete(id);
    }
  );
}
openModalDetails(contact:any){
  this.showDetailsModal.set(true);
  this.selectedContact.set(contact);
}

 onSearch() {
  if (!this.globalSearch.trim()) {
    this.contactFacade.loadingContact();
    return;
  }

  this.contactFacade.loadingContact({
    busqueda: this.globalSearch
  });
}



}
