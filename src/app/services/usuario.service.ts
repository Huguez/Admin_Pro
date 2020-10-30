import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { LoginForm } from '../interfaces/login-form';
import { RegisterForm } from '../interfaces/register-form';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient ){ }
  
  validarToken(){
    const token = localStorage.getItem('token') || '';
    
    return this.http.get( `${ base_url }/login/renew` , {
      headers: { 'x-token': token } 
    } ).pipe( 
      tap( ( resp:any ) => {
        localStorage.setItem( 'token', resp.token );
      } ),
      map( ( resp:any ) => {
        return true
      } ), catchError( error => of( false ) )
     )
  }


  crearUsuario( formData: RegisterForm ){
    return this.http.post( `${ base_url }/usuarios`, formData ).pipe( 
      tap( ( resp:any ) => {
        localStorage.setItem( 'token', resp.token );
      } )
     );
  }


  login( formData: LoginForm ){
    return this.http.post( `${ base_url }/login`, formData ).pipe( 
      tap( ( resp:any ) => {
        console.log( formData );
        
        localStorage.setItem( 'token', resp.token );
      } )
     );
  }

  
  loginGoogle( token ){
    return this.http.post( `${ base_url }/login/google`, {token} ).pipe( 
      tap( ( resp:any ) => {
        console.log( resp.tokenJWT );
        
        localStorage.setItem( 'token', resp.tokenJWT );
      } )
     );
  }


}
