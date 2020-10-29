import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { UsuarioService } from '../../services/usuario.service';

import swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {

  public formSumitted = false;

  public loginForm = this.fb.group({
    email:     ['user@example.com', [Validators.required, Validators.email ] ],
    password:  ['1234', [Validators.required ] ],
    recordarme: [false]
  } );

  constructor( private fb: FormBuilder, private _us: UsuarioService, private router: Router ){}

  login(){
    
    this._us.login( this.loginForm.value ).subscribe(
      ( res:any )=>{
        console.log( res.token );
      }, ( err )=>{
        
        swal.fire("Error", err.error.msg, 'error');
      }
    )
    
    // this.router.navigateByUrl( '/' );    
  }
}
