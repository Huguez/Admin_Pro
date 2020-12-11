import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { BusquedaService } from '../../../services/busqueda.service';
import { Usuario } from '../../../models/usuario.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  
  public usuarios: any;
  public usuariosTemp: any;
  public desde: number = 0;
  public hasta: number = 2;
  public total: number = 0;
  public cargando: boolean = true;

  constructor( private _us:UsuarioService, private _bs: BusquedaService, private _mis:ModalImagenService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  ngOnDestroy(): void {}
  
  cargarUsuarios(){
    this.cargando = true;
    this._us.cargarUsuarios( this.desde ).subscribe( ( resp:any ) => {
      
      this.usuarios = resp.usuarios;
      this.usuariosTemp = resp.usuarios;
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
    if( termino.length === 0 ){
      this.usuarios = this.usuariosTemp;
      return;
    }

    this._bs.buscar( 'usuarios', termino ).subscribe( 
      ( result: any ) => {
        console.log( result );
        this.usuarios = result;
        this.total = result.length;
      }
    );
  }

  eliminarUsuario( usuario:Usuario ){
    
    if( usuario.id === this._us.uid ){
      return Swal.fire( 'Error', 'No puedes auto-borrarte' );
    }
    
    Swal.fire({
      title: '¿seguro?',
      text: `¿Estas Seguro de borar a ${ usuario.nombre }?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._us.eliminarUsuario( usuario ).subscribe( ( resp:any ) => {
          Swal.fire(
            'Borrado!',
            `Se ha Borrado a ${ usuario.nombre }.`,
            'success'
          )
          this.cargarUsuarios();
        });
      }
    })

  }

  cambiarRol( usuario: Usuario ){
    this._us.modificarUsuario( usuario ).subscribe(
      (resp: any) => {
        this.cargarUsuarios();
      }
    );
  }

  
  abrirModal( user: Usuario ){
    console.log( user );
    this._mis.abrirModal();
    
  }

}
