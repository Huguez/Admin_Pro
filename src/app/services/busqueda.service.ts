import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor( private http: HttpClient ) { }
  
  private get token(): string {
    return localStorage.getItem('token') || '';
  }
  
  private get headers(){
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

  private trasformarHospital( result: any[] ):Usuario[] {
    return result;
  }

  private trasformarMedicos( result: any[] ):Medico[]{
    return result;
  }
  
  busquedaGlobal( termino:string ){
    const endPoint = `${ base_url }/todo/${ termino }`;
    return this.http.get( endPoint, this.headers );
  }

  buscar( tipo: 'usuarios'|'medicos'|'hospitales', termino: string ){

    const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`;
    
    return this.http.get( url, this.headers ).pipe( 
      map( (resp:any) => {
        switch( tipo ){
          case 'usuarios':
            return this.trasformarUsuarios( resp.result );
          case 'medicos':
            return  this.trasformarMedicos( resp.result );
          case 'hospitales':
            return this.trasformarHospital( resp.result );
          default:
            return [];
        }

      } )
    
    );

  }

  

}
