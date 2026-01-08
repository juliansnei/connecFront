import { inject, Injectable, signal } from "@angular/core";
import { ContactService } from "../services/contact.service";
import { single } from "rxjs";

@Injectable({providedIn:'root'})

export class ContactFacade
 {
    private contactService = inject(ContactService)
    contacts = signal<any[]>([]);
    selectedContact = signal<any|null>(null);
    unreadContacts = signal<number>(0);




    loadingContact(filters?: { busqueda?: string }){
        this.contactService.getAll(filters).subscribe({
            next:(response) => {
                if(response.status === 'success'){
                    const newValues = response.data;
                    this.contacts.set(newValues);
                    console.log("data retornada en el getAll",response.data)
                }
            }, error:(error) => {
                console.error("error al obtener los contactos",error);
            }
        })
    }

    create(request:any){
        const values = 
        {
            nombre: request.name,
            apellido:request.lastname,
            descripcion:request.description,
            telefono:request.phone,
            email:request.email
        }
       this.contactService.create(values).subscribe({
        next:(response) => {
            if(response.status === 'success'){
                const newValues = response.data;
                const currentValues = this.contacts();
                this.contacts.set([...currentValues,newValues])
                console.log("Contacto creado existosamente",response.data);
            }
        }, error:(error) =>{
            console.error("ocurrio un error", error);
        }
       })
    }

  increaseUnread(){
     this.unreadContacts.update(value => value +1)
  }
  clearUnread(){
    this.unreadContacts.set(0)
  }
  delete(id:number){
    this.contactService.delete(id).subscribe({
        next:(response) =>{
            if(response.status === 'success'){
            const currentContacts = this.contacts();
            this.contacts.set(currentContacts.filter(contact => contact.id !==id));
            console.log("Contacto eliminaddo")
            }
            
        }, error: (error) => {
            console.error("Error al eliminar el contacto",error);
        }
    })
  }
  setUnread(count:number){
    this.unreadContacts.set(count);
  }
  clearSelection(){
    this.selectedContact.set(null);
  }
  selectContact(selectContact:any|null){
     this.selectedContact.set(selectContact);
  }
  update(id:number,request:any){
    this.contactService.update(id,request).subscribe({
        next:(response)=> {
            if(response.status === 'success'){
                const newData = response.data;
                const updateContacts = this.contacts().map(contact => contact.id === newData.id ? newData:contact);
                this.contacts.set(updateContacts);
                console.log("ActualizaDO");
            }
        }
    })
  }

 }