import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { Venta } from '../models/venta';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiventaService {

  url: string = 'https://localhost:44316/api/Venta';

  public list: any[] = [];
  nom: string;
  constructor(
    private _http: HttpClient
  ) { }

  getVenta(): Observable<Response>{
    console.log (this._http.get<Response>(this.url));
    return this._http.get<Response>(this.url);

  }


  add(venta: Venta): Observable<Response> {
   return this._http.post<Response>(this.url, venta, httpOption);
  }

  edit(venta: Venta):Observable<Response>{
    return this._http.put<Response>(this.url, venta, httpOption);
  }

  delete(id: number):Observable<Response>{
    return this._http.delete<Response>(`${this.url}/?Id=${id}`);
  }
}
