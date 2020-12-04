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

  menuItems: any[];
  
  public imgUrl;
  public usuario: Usuario;

  constructor( private _us: UsuarioService, private s_sidebar: SidebarService ){
    this.menuItems = s_sidebar.menu;
    this.usuario = _us.usuario;
  }

  ngOnInit(): void {
  }

}
