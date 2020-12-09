import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  
  public usuarios: any;

  constructor( private _us:UsuarioService ) { }

  ngOnInit(): void {
    this._us.cargarUsuarios(0).subscribe( ( resp:any ) => {
      this.usuarios = resp.usuarios;
      console.log(resp.usuarios );
    });

  }

  ngOnDestroy(): void {
    this._us.cargarUsuarios();
  }

}
