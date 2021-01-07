import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( private _us: UsuarioService, private _router: Router ){}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
    // console.log("entro al admin Guard");
    
    if( this._us.roleUsuario === 'ADMIN_ROLE' ){
      return true;
    }
    
    this._router.navigateByUrl('/dashboard');
    return false;
  }
}
