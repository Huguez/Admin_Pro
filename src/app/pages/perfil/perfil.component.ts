import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {
  
  public perfilForm: FormGroup;
  public usuario: Usuario;

  constructor( private fb:FormBuilder, private _us: UsuarioService ){ 
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

}
