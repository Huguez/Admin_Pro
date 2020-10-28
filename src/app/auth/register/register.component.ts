import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    terminos:  [ false, [ Validators.required ] ]
  });

  constructor( private fb: FormBuilder ){}
  
  crearUsuario(){
    this.formSumitted = true;
    console.log( this.registerForm.value );
    if( this.registerForm.valid ){
      console.log("posteando formulario...");
    }else{
      console.log("formulario no es correcto");
    }
  }

  campoNoValido( campo: string ){
    if( !this.registerForm.get( campo ).valid  && this.formSumitted ){
      return true;  
    }
    return false;
  }

  aceptarTerminos(  ){
    return !this.registerForm.get('terminos').value && this.formSumitted;
  }
}
