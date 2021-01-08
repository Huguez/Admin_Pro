import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  
  public imgUrl;
  public usuario: Usuario;

  constructor( private _us: UsuarioService, public s_sidebar: SidebarService ){
    this.usuario = _us.usuario;
  }

  ngOnInit(): void {
  }

}
