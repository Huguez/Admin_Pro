import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsuarioService } from '../../services/usuario.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {
  
  public formSumitted = false;

  public registerForm = this.fb.group({
    nombre:    ['user', [ Validators.required ] ],
    email:     ['user@example.com', [Validators.required, Validators.email ] ],
    password:  ['1234', [Validators.required ] ],
    password2: ['1234', [Validators.required ] ],
    terminos:  [ true, [ Validators.required ] ]
  }, {
    validators: this.passwordsIguales( 'password', 'password2' )
  }  );

  constructor( private fb: FormBuilder, private _us: UsuarioService ){}
  
  crearUsuario(){
    this.formSumitted = true;
    
    if( this.registerForm.invalid ){
      return;
    }
    
    this._us.crearUsuario( this.registerForm.value ).subscribe( 
      ( res ) => console.log("")
     ,( error ) => {
       console.log(error);
      swal.fire( 'Error', error.error.mensaje, 'error' ) 
    });


  }

  campoNoValido( campo: string ){

    if( !this.registerForm.get( campo ).valid  && this.formSumitted ){
      return true;  
    }
    return false;
  }

  aceptarTerminos(){
    return !this.registerForm.get('terminos').value && this.formSumitted;
  }

  passwordNoValido(){
    
    const pass1 = this.registerForm.get( 'password' );
    const pass2 = this.registerForm.get( 'password2' );
    
    if( pass1.value !== pass2.value && this.formSumitted ){
      return true;
    }

    return false;
  }


  passwordsIguales( pass:string, pass2:string ){
    return ( formGroup: FormGroup ) => {
      const p1 = formGroup.get( pass );
      const p2 = formGroup.get( pass2 );
      
      if( p1.value === p2.value ){
        p2.setErrors( null );
      }else{
        p2.setErrors( { noEsIgual: true } );
      }

    }
  }

}
