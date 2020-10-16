import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {
    this.retornaObservable().pipe( 
        retry()
      ).subscribe( 
        valor => console.log("subs: ", valor ), 
        err => console.warn("valio queso por esto: ", err ),
        () => console.log("Si se hizo Carnal")
    );
  }


  retornaObservable(): Observable<number> {

    let i = -1;
    
    const obs$ = new Observable<number>( observer =>{
      
      const intervalo = setInterval( () => {
        
        i++;
        observer.next( i );
        if( i  === 5 ){
          clearInterval( intervalo );
          observer.complete();
        }
        
        if( i  === 2 ){
          // clearInterval( intervalo );

          observer.error("i llego al valor de 2");
        }

      }, 2000 );
    } );

    return obs$;
  }

}
