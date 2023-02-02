import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Response } from '../models/response';
import { MatSnackBar } from "@angular/material/snack-bar";
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario';

const httpOption = {
    headers: new HttpHeaders({
      'Contend-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})

export class ApiauthService {

   url: string = 'https://localhost:44316/api/User/login';  
   //usuario: Usuario;

   private usuarioSubject: BehaviorSubject<Usuario>;  
   public usuario: Observable<Usuario>; 
   
   public get usuarioData(): Usuario{
     return this.usuarioSubject.value;
   }

   /*public get usuariologins(): Usuario{
    return this.usuarioData; 
   }*/

   constructor( private _http: HttpClient, public snackBar: MatSnackBar ){   
    this.usuarioSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')));  
    this.usuario = this.usuarioSubject.asObservable(); 
   }

   login(email: string, password: string): Observable<Response> {
    return this._http.post<Response>(this.url, {email, password}, httpOption).pipe(
        map(res =>{
          if(res.exito === 1){
            const usuario : Usuario = res.data;
            localStorage.setItem('usuario', JSON.stringify(usuario));
            this.usuarioSubject.next(usuario);   
          }
          return res;
        }));  
   }

   logout(){
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
    this.snackBar.open('Sesión Cerrada Con Exito', '',{
      duration: 2000
    });
   }

}