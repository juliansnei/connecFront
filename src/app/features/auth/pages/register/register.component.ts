import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  implements OnInit{

  registerForm!:FormGroup

  public constructor(private fb:FormBuilder){}
  ngOnInit(): void {
   this.initForm();
  }


  initForm(){
    this.registerForm = this.fb.group({
      email: ['',[Validators.email]],
      name: ['',[Validators.required]],
      apellidos: ['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  onRegister(){
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched
      return;
    }

    const request = this.registerForm.value;

    console.log("valors del formulario")
  }

}
