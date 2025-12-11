import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;

  public constructor(private fb:FormBuilder){}


  ngOnInit(): void {
    this.initForm();
  }


  initForm(){
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(8)]]
    })
  }

  onSubmit(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
    console.log("Enviando al back");
  }

}
