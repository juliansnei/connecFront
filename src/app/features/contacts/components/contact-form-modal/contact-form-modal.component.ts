import { Component, computed, effect, inject, InjectionToken, input, OnInit, output, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { FORM_FIELDS } from '../../constants/form-fields';
import { ButtonModule } from 'primeng/button';
import { FacadaValidatos } from '../../Facades/facade.validators';
import { ValidationService } from '../../../../core/services/validation.service';
import { CommonModule } from '@angular/common';
import { ContactFacade } from '../../Facades/contact-facade';

@Component({
  selector: 'app-contact-form-modal',
  imports: [DialogModule,ReactiveFormsModule,ButtonModule,CommonModule],
  templateUrl: './contact-form-modal.component.html',
  styleUrl: './contact-form-modal.component.css'
})
export class ContactFormModalComponent implements OnInit
{


  private facadeValidators = inject(FacadaValidatos);
  private validationService = inject(ValidationService)


  visible = input<boolean>(false);
  title = input<string>('titulo aqui');
  buttonLabel = input<string>('name button here');
  data = input<any |null>(null);
  isEditMode = computed(() => !!this.data());


  //evventos
  visibleChange = output<boolean>();
   onSend = output<any>();
   closeModal = output<void>();
   resetForm =  output<void>();



  fieldsForm = FORM_FIELDS;

  //form
  form!:FormGroup

  //detecta cuando llega data
private contactEffect = effect(() => {
  const data = this.data();
  if (!this.form) return;

  if (data) {
    const mapped = {
      name:data.nombre,
      lastname:data.apellido,
      email:data.correo,
      phone:data.telefono,
      description:data.descripcion,

    }
    this.form.patchValue(mapped);
  } else {
    this.form.reset();
  }
});

  constructor(private fb:FormBuilder){}
  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.form = this.fb.group({})
    this.fieldsForm.forEach( field => {
      this.form.addControl(
        field.name,
        this.fb.control('',this.facadeValidators.buildValidators(field.validations))
      )
    })
  }

  onSubmit(){
    if(this.form.invalid){
      this.form.markAllAsTouched()
      return;
    }
    const values = this.form.value;
    if(this.isEditMode()){
    this.onSend.emit({
      mode:'edit',
      id:this.data()?.id,
      payload:values});

    }else{
      this.onSend.emit(
        {
          mode:'create',
          payload: values
        }
      )
    }
    this.closeModal.emit()
    this.form.reset();
    
  }

  getFieldError(fieldName:string):string|null{
     const control = this.form.get(fieldName);
     return this.validationService.getErrorsMessage(control)

  }


 
 

}
