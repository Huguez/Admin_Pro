import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent {

  public titulo:string = "Blank Page";

  constructor( private router: Router ) { 
    this.getArgumentosRuta();
  }
  
  getArgumentosRuta(){
    this.router.events.pipe( 
        filter( event => event instanceof ActivationEnd ),
        filter( ( event:ActivationEnd ) => event.snapshot.firstChild === null ),
        map( ( event:ActivationEnd ) => event.snapshot.data )
      )
    .subscribe( ( data:any ) => { 
      this.titulo = data.titulo
      document.title = `AdminPro - ${ this.titulo }`;
    } );
  }
  
}
