import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { LoginForm } from '../interfaces/login-form';
import { RegisterForm } from '../interfaces/register-form';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

declare const gapi:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2:any;
  public usuario:Usuario;

  constructor( private http: HttpClient, private ngZone: NgZone ){ 
    this.initGoogle();
  }

  
  initGoogle(){
    return new Promise( resolve => {
      
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '624122287896-jqnav46er0cs578ukts03tdr33n5e8k5.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',  
        });
        resolve();
      });
      
    } )
  }

  validarToken(){
    const token = localStorage.getItem('token') || '';
    
    return this.http.get( `${ base_url }/login/renew` , {
      headers: { 'x-token': token } 
    } ).pipe( 
      tap( ( resp:any ) => {
        
        const { 
          nombre,
          email,
          password,
          img,
          google,
          role,
          id } = resp.usuario;
        
          this.usuario = new Usuario( nombre, email, "", img, google, role, id  );

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

  logout(){
    localStorage.removeItem( 'token' );

    // this.auth2 = gapi.auth2.getAuthInstance();

    this.auth2.signOut().then( () => {
      this.ngZone.run( () => {
        console.log('logout');
      } )
    });
  }

}
