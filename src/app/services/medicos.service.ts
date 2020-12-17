import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  
  constructor( private _http: HttpClient ) { }
  
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
  
  crearMedico( medico: { nombre:string, hospital: string } ){
    const endPoint = `${base_url}/medicos`;
    return this._http.post( endPoint, medico, this.headers );
  }

  getMedico( id: string ){
    const endpoint = `${base_url}/medicos/${ id }`;
    return this._http.get( endpoint, this.headers ).pipe( map( ( resp: { ok: boolean, medico: Medico } ) =>  resp.medico ) );
  }

  getMedicos(){
    const endPoint = `${ base_url }/medicos`;
    return this._http.get( endPoint, this.headers ).pipe( map( 
      ( resp: { ok: boolean, medicos: Medico[] } ) =>  {
        return resp.medicos
      } ) );
  }

  actualizarMedico( medico: Medico ){
    const endPoint = `${base_url}/medicos/${ medico.id }`;
    // console.log( medico );
    return this._http.put( endPoint, medico, this.headers );
  }
  
  deleteMedico( id:string ){
    const endPoint = `${base_url}/medicos/${ id }`;
    return this._http.delete( endPoint, this.headers );
  }
  
}
