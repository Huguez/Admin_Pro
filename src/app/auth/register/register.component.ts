import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  
  public registerForm = this.fb.group({
    nombre:    ['user', [ Validators.required ] ],
    email:     ['example@email.com', [Validators.required, ] ],
    password:  ['password', [Validators.required ] ],
    password2: ['password', [Validators.required ] ],
    terminos:  [ false, [ Validators.required ] ]
  });

  constructor( private fb: FormBuilder ){}
  
  crearUsuario(){
    console.log( this.registerForm.value );
  }
}
