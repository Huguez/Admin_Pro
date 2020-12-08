import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

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
  
  public usuario: Usuario;

  constructor( private _us:UsuarioService, private router: Router ) {
    this.usuario = _us.usuario;
  }

  ngOnInit(): void {
  }

  logout(){
    this._us.logout();
    this.router.navigateByUrl( '/login' );
  }

}
