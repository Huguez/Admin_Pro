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
  public desde: number = 2;
  public hasta: number = 3;
  public total: number = 0;

  constructor( private _us:UsuarioService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  ngOnDestroy(): void {}
  
  cargarUsuarios(){
    this._us.cargarUsuarios( this.desde ).subscribe( ( resp:any ) => {
      
      this.usuarios = resp.usuarios;
      this.total = resp.total;

      // console.log(resp.usuarios );
    });
  }

  cambiarDesde( valor ){
    this.desde += valor;
    
    if( this.desde < 0 ){
      this.desde = 0;
    }
    
    if( this.desde >= this.total ){
      // this.desde = this.total;
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }
}
