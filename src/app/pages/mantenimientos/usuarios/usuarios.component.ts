import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedaService } from '../../../services/busqueda.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  
  public usuarios: any;
  public desde: number = 0;
  public hasta: number = 2;
  public total: number = 0;
  public cargando: boolean = true;

  constructor( private _us:UsuarioService, private _bs: BusquedaService   ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  ngOnDestroy(): void {}
  
  cargarUsuarios(){
    this.cargando = true;
    this._us.cargarUsuarios( this.desde ).subscribe( ( resp:any ) => {
      
      this.usuarios = resp.usuarios;
      this.total = resp.total;
      // console.log(resp.usuarios );
      this.cargando = false;
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

  buscarUsuario( termino: string ){
    if( termino === '' ){
      return ;
    }
    this._bs.buscar( 'usuarios', termino ).subscribe( 
      ( result: any ) => {
        console.log( result );
        this.usuarios = result;
      }
    );
  }


}
