import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {
  
  constructor( private _http:HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    };
  }
  
  cargarHospitales( desde: number = 0, hasta: number = 2 ){
    const endpoint = `${ base_url }/hospitales`;
    return this._http.get( endpoint, this.headers ).pipe(
      map( (resp:{ ok: boolean, hospitales: Hospital[] }) => resp.hospitales )
    );
  }
  
  crearHospital( nombre: string ){
    const endpoint = `${ base_url }/hospitales`;
    return this._http.post( endpoint, { nombre }, this.headers );
  }
  
  actualizarHospital( id: string, nombre:string ){
    const endpoint = `${ base_url }/hospitales/${ id }`;
    return this._http.put( endpoint, { nombre }, this.headers );
  }

  deleteHospital( id: string ){
    const url = `${ base_url }/hospitales/${ id }`;
    return this._http.delete( url, this.headers );
  }
  
}
