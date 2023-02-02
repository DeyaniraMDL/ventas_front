import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { Response } from '../models/response' ;

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiproductosService {
  url: string = 'https://localhost:44316/api/Producto';
  
  constructor(private _http: HttpClient) { }

  getProducto(): Observable<Response>{
    return this._http.get<Response>(this.url);
  }

  add(producto: Producto):Observable<Response>{
    return this._http.post<Response>(this.url, producto, httpOption);
  }

  edit(producto: Producto):Observable<Response>{
    return this._http.put<Response>(this.url, producto, httpOption);
  }

  delete(id: number):Observable<Response>{
    return this._http.delete<Response>(`${this.url}/?Id=${id}`);
  }

}
