import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiauthService } from "../services/apiauth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit{
    public email: string = '';
    public password: string = '';


   public loginForm = this.formBuilder.group({
      emails: [this.email, Validators.required],
      passwords: [this.password, Validators.required],
    });


    constructor(public apiauthService: ApiauthService, 
                private router: Router, 
                private formBuilder: FormBuilder,
                public snackBar: MatSnackBar){   
             /* if (this.apiauthService.usuarioData){
                this.router.navigate(['/']);
              }*/
    }

    ngOnInit(){        
    }
      

        login(){
        this.apiauthService.login(this.email, this.password).subscribe(response => {
         if (response.exito === 1) {
           this.router.navigate(['/']);
         }
         if (response.exito === 0){
          this.snackBar.open('  Usuario o Contraseña Incorrecta', '',{
            duration: 2000});
         }               
      });
    }
    

    /*login(){
      this.apiauthService.login(this.login.value as Logins).subscribe(response => {
         //console.log(response);
         if (response.exito === 1) {
           this.router.navigate(['/']);
         }
      });
    }*/



}