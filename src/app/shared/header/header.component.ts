import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  
  public nombreUsuario = '';
  public imgUrl = '';
  public emailUsuario = '';

  constructor( private _us:UsuarioService, private router: Router ) {
    this.imgUrl = _us.usuario.getImagen;
    this.nombreUsuario = _us.usuario.getNombre;
    this.emailUsuario = _us.usuario.getEmail;
  }

  ngOnInit(): void {
  }

  logout(){
    this._us.logout();
    this.router.navigateByUrl( '/login' );
  }

}
