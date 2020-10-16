import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  constructor() {

    const obs$ = new Observable( observer =>{
      
      let i = 0;
      const intervalo = setInterval( () => {
        
        i++;
        observer.next( i );
        if( i  === 5 ){
          clearInterval( intervalo );
          observer.complete();
        }
        
        if( i  === 2 ){
          clearInterval( intervalo );
          observer.error("i llego al valor de 2");
        }

      }, 2000 );
    } );

    obs$.subscribe( 
      valor => console.log("subs: ", valor ), 
      err => console.warn("valio queso por esto: ", err ),
      () => console.log("Si se hizo Carnal")
    );


  }

  ngOnInit(): void {
  }

}
