import { Component } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Route, Router } from '@angular/router';
import { Usuario } from './models/usuario';
import { ApiauthService } from './services/apiauth.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  usuario: Usuario;
  usuariologin = '';

   constructor(public apiauthService: ApiauthService, private router: Router){
    //this.usuariologin = this.apiauthService.usuarioData.email;
    this.apiauthService.usuario.subscribe( res => {
         this.usuario = res;
         console.log('cambio el objeto ' + res);
       });
       if( this.apiauthService.usuarioData != null ){
        this.usuariologin = this.apiauthService.usuarioData.email;
       }
   }

   
   logout(){
     this.apiauthService.logout();
     this.router.navigate(['/login']);
   }

}
