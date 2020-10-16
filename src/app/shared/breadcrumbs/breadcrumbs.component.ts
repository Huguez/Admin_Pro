import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo:string = "Blank Page";
  public tituloSubs$ : Subscription;

  constructor( private router: Router ) { 
    this.tituloSubs$ =  this.getArgumentosRuta().subscribe( ( data:any ) => { 
      this.titulo = data.titulo
      document.title = `AdminPro - ${ this.titulo }`;
    } );
  }
  
  getArgumentosRuta(){

    return this.router.events.pipe( 
      filter( event => event instanceof ActivationEnd ),
      filter( ( event:ActivationEnd ) => event.snapshot.firstChild === null ),
      map( ( event:ActivationEnd ) => event.snapshot.data )
    );
  }

  ngOnDestroy(){
    this.tituloSubs$.unsubscribe();
  }
  
}
