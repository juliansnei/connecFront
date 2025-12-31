import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { RouteManagerService } from '../../../../core/services/route-manager.service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,
     CommonModule,
      RouterLink,
      RouterLink
    ],
  standalone:true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;

  public constructor(
    private fb:FormBuilder,
    private authService: AuthService,
    private routerManager:RouteManagerService
  ){}


  ngOnInit(): void {
    this.initForm();
  }


  initForm(){
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(4)]]
    })
  }

  onSubmit(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      console.log("formulario invalido");
      return;
    }
    const request = this.loginForm.value;
    console.log("Que tiene el request?", request)
    this.authService.login(request).subscribe({
      next:(response) => {
          this.authService.setToken(response.data.token)
        console.log("loguedo exitosamente",response);
        this.routerManager.navigateToRoute('/contactos')
      }, error: (error) => {
        console.error("error al loguearse",error);
      }
    })
  }

}
