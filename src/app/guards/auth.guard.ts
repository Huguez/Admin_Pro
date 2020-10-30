import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor( private _us: UsuarioService, private router: Router ){ }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    console.log("Paso por el Guard");
    
    
    
    return this._us.validarToken().pipe( tap( ( isAuth ) => {
      if( !isAuth ){
        this.router.navigateByUrl( '/login' );
      }
    } ) );
  }
  
}
