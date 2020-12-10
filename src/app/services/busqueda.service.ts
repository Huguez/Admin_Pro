import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor( private http: HttpClient ) { }
  
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

  private trasformarUsuarios( result: any[] ):Usuario[] {
    
    return result.map( 
      ( user: any ) =>  new Usuario( user.nombre, user.email, '', user.img, user.google, user.role, user.id ) );
  }

  buscar( tipo: 'usuarios'|'medicos'|'hospitales', termino: string ){

    const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`;
    
    return this.http.get( url, this.headers ).pipe( 
      map( (resp:any) => {
        switch( tipo ){
          case 'usuarios':
            return this.trasformarUsuarios( resp.result );
          case 'medicos':
            break;
          case 'hospitales':
            break;
          default:
            return [];
        }

      } )
    
    );

  }

  

}
