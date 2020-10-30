import { Component, NgZone, OnInit } from '@angular/core';
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
  public auth2:any;

  public loginForm = this.fb.group({
    email:     [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
    password:  ['', [ Validators.required ] ],
    recordarme: [false]
  } );

  constructor( private fb: FormBuilder, private _us: UsuarioService, private router: Router , private ngZone: NgZone  ){}

  ngOnInit(): void {
    this.renderButton();
  }

  login(){
    this.formSumitted = true;
    
    if( this.loginForm.invalid ){
      return;
    }

    this._us.login( this.loginForm.value ).subscribe(
      ( res:any )=>{
        
        if( this.loginForm.get('recordarme').value ){
          localStorage.setItem( 'email', this.loginForm.get('email').value );
          
        }else{
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl( '/' );

      }, ( err )=>{
        console.log(err);
        
        swal.fire("Error", err.error, 'error');
      }
    )
    
    // this.router.navigateByUrl( '/' );    
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      
    });

    this.startApp();
  }
  
  startApp() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '624122287896-jqnav46er0cs578ukts03tdr33n5e8k5.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',  
      });

      this.attachSignin( document.getElementById( 'my-signin2' ) );
    });
  }

  attachSignin(element) {
    
    this.auth2.attachClickHandler(element, {},
        ( googleUser ) => {
          
          const id_token = googleUser.getAuthResponse().id_token;
          // console.log( id_token );
          this._us.loginGoogle( id_token ).subscribe( 
            
            resp => this.ngZone.run( () => {
              this.router.navigateByUrl( '/' )
            } )
          );
          
        }, ( error ) => {
          alert( JSON.stringify(error.error, undefined, 2) );
        });
  }


  campoNoValido( campo: string ){

    if( !this.loginForm.get( campo ).valid  && this.formSumitted ){
      return true;  
    }
    return false;
  }

}
