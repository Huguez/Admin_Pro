import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileuploadService } from '../../services/fileupload.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  
  public perfilForm:   FormGroup;
  public usuario:      Usuario;
  public imagenSubida: File;
  public imgTemp:      any; 

  constructor( private fb:FormBuilder, private _us: UsuarioService, private _fs: FileuploadService ){ 
    this.usuario = _us.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group( { 
      nombre: [this.usuario.nombre,  Validators.required ],
      email: [ this.usuario.email, [ Validators.required, Validators.email ] ]
    } );
  }

  actuaizarPerfil(){
    this._us.actualizarPerfil( this.perfilForm.value ).subscribe( ( resp:any ) => {
      
      this.usuario.nombre = resp.usuario.nombre;
      this.usuario.email = resp.usuario.email;
      
      Swal.fire( 'Guardado', 'Cambios Generados', 'success');

    }, (error) => {
      
       Swal.fire( 'Error!!!', error.error.msg+" !!!", 'error' );
    } );
    
  }

  cambiarImagen( f: any ){
    this.imagenSubida = f.target.files[0];
    const file = f.target.files[0];
    
    if( !file ){
      return this.imgTemp = null;
    }
    
    const reader  = new FileReader();
    reader.readAsDataURL( file );
    
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
    
  }

  subirImagen(){    
    this._fs.actualizarFoto( this.imagenSubida, 'usuarios', this.usuario.id ).then( resp => {
        this._us.usuario.img = resp.nombreArchivo
        Swal.fire( 'Guardado!!!', 'Imagen subida con exito', 'success');
      } ).catch( error => {
        console.log( error );
        Swal.fire( 'Error!!!', 'No se pudo subir la imagen', 'error' );
      } 
    )
  }


}
