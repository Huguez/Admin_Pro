import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {
  
  public intertavlSubs: Subscription;


  constructor() {

    // this.retornaObservable().pipe( 
    //     retry()
    //   ).subscribe( 
    //     valor => console.log("subs: ", valor ), 
    //     err => console.warn("valio queso por esto: ", err ),
    //     () => console.log("Si se hizo Carnal")
    // );

    this.intertavlSubs = this.retornaIntervalo( 90, 10 ).subscribe( console.log );
  }


  ngOnDestroy(){
    this.intertavlSubs.unsubscribe();
    console.log("se detiene la suscripcion!!");
    
  }
  
  retornaIntervalo( time: number, tope: number ): Observable<number> {
    return interval( time )
            .pipe( 
              // take( tope ), 
              map( valor =>  valor + 1 ) ,
              filter( valor=> valor%2  === 0 )
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