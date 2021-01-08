import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { of, Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

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
  public usuario: Usuario;

  constructor( private http: HttpClient, private ngZone: NgZone ){ 
    this.initGoogle();
  }
  
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  
  get uid(): string {
    return this.usuario.id;
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  get roleUsuario(): string {
    return this.usuario.role;
  }

  guardarStorage( token, menu ){
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'menu', JSON.stringify( menu ) );
  }

  initGoogle(){
    return new Promise<void>( resolve => {
      
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
    
    return this.http.get( `${ base_url }/login/renew` , this.headers ).pipe( 
      map( ( resp:any ) => {
        
        const { 
          nombre,
          email,
          password,
          img = '',
          google,
          role,
          id 
        } = resp.usuario;
          
        this.usuario = new Usuario( nombre, email, "", img, google, role, id  ); 
       
        // localStorage.setItem( 'token', resp.token );
        // localStorage.setItem('menu', resp.menu );
        this.guardarStorage( resp.token, resp.menu );
        
        return true;
      } ),
      catchError( error => of( false ) )
    )
  }

  crearUsuario( formData: RegisterForm ){
    return this.http.post( `${ base_url }/usuarios`, formData ).pipe( 
      map( ( resp:any ) => {
        this.guardarStorage( resp.token, resp.menu );
        return resp;
      } ), catchError( err => {
        console.log(err);
        
        Swal.fire( err.error.msj, 'Use otro correo', 'error' );
        return of( err );
      } )
     );
  }

  login( formData: LoginForm ){
    return this.http.post( `${ base_url }/login`, formData ).pipe( 
      tap( ( resp:any ) => {
        this.guardarStorage( resp.token, resp.menu );
        
      } )
     );
  }
  
  loginGoogle( token ){
    return this.http.post( `${ base_url }/login/google`, {token} ).pipe( 
      tap( ( resp:any ) => {
        // console.log( resp.tokenJWT );
        resp['token'] = resp.tokenJWT;
        this.guardarStorage( resp.token, resp.menu );
        
        // localStorage.setItem( 'token', resp.tokenJWT );
        // localStorage.setItem( 'menu', resp.menu );
      } )
     );
  }

  logout(){
    localStorage.removeItem( 'token' );
    localStorage.removeItem('menu');
    
    this.auth2.signOut().then( () => {
      this.ngZone.run( () => {
        console.log('logout');
      } )
    });
  }

  actualizarPerfil( data: { email:string, nombre:string, role: string } ){
    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put( `${ base_url }/usuarios/${ this.uid }`, data, this.headers );
  }
  
  modificarUsuario( usuario: Usuario ){
    const url = `${ base_url }/usuarios/${ usuario.id }`;
    // console.log(url);
    
    return this.http.put( `${ base_url }/usuarios/${ usuario.id }`, usuario, this.headers );
  }

  cargarUsuarios( desde: number = 0, hasta: number = 2 ){
    return this.http.get( `${ base_url }/usuarios?desde=${ desde }&hasta=${ hasta }`, this.headers ).pipe(
      map( ( resp: any ) => {
          const usuarios = resp.usuarios.map( user => new Usuario( user.nombre, user.email, '', user.img, user.google, user.role, user.id ) );
          const total = resp.total;
        return { total, usuarios };
      })
    )
  }
  
  eliminarUsuario( usuario:Usuario ){
    const url = `${ base_url }/usuarios/${ usuario.id }`;

    return this.http.delete( url, this.headers );
  }

}
