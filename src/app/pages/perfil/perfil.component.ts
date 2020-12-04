import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileuploadService } from '../../services/fileupload.service';

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
      console.log( resp.usuario );
      this.usuario.nombre = resp.usuario.nombre;
      this.usuario.email = resp.usuario.email;
    } );
    
  }

  cambiarImagen( file: any ){
    this.imagenSubida = file.target.files[0];
  }

  subirImagen(){
    console.log( this.imagenSubida );
    
    this._fs.actualizarFoto( this.imagenSubida, 'usuarios', this.usuario.id ).then( resp => console.log( resp )
     );
  }
}
