import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';
import { resolve } from 'dns';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuario().then( usuarios => {
      console.log( usuarios );
    });

    // const promesa = new Promise( (resolve, reject) => {
      
    //   if( false ){
    //     resolve("Hola mundo!!!");
    //   }else{
    //     reject("No se hizo");
    //   }

    // } );

    // promesa.then( (msj) =>{
    //   console.log( msj );
        
    // } ).catch( err => console.log("Error: ", err) );

    // console.log("fin init");
  }


  getUsuario(){

    return new Promise( resolve => {
      return fetch('https://reqres.in/api/users').then( resp => {
        resp.json().then( body => { 
          resolve( body.data );
        } );
      } );
    } );
    
  }

}
