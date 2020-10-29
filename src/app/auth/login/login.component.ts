import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { UsuarioService } from '../../services/usuario.service';

import swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public formSumitted = false;

  public loginForm = this.fb.group({
    email:     [ localStorage.getItem('email') || '', [Validators.required, Validators.email ] ],
    password:  ['', [Validators.required ] ],
    recordarme: [false]
  } );

  constructor( private fb: FormBuilder, private _us: UsuarioService, private router: Router ){}

  ngOnInit(): void {
    this.renderButton();
  }

  login(){
    
    this._us.login( this.loginForm.value ).subscribe(
      ( res:any )=>{
        
        if( this.loginForm.get('recordarme').value ){
          localStorage.setItem( 'email', this.loginForm.get('email').value );
          
        }else{
          localStorage.removeItem('email');
        }

      }, ( err )=>{
        swal.fire("Error", err.error.msg, 'error');
      }
    )
    
    // this.router.navigateByUrl( '/' );    
  }

  onSuccess( googleUser ) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log( id_token );
  }

  onFailure(error) {
    console.log(error);
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSuccess,
      'onfailure': this.onFailure
    });
  }

}
