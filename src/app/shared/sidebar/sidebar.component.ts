import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  
  public imgUrl = '';
  public nombreUsuario = '';

  constructor( private _us: UsuarioService, private s_sidebar: SidebarService ){
    this.menuItems = s_sidebar.menu;
    this.imgUrl = _us.usuario.getImagen;
    this.nombreUsuario = _us.usuario.getNombre;
  }

  ngOnInit(): void {
  }

}
