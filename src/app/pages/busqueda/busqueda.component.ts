import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {
  
  public termino: string;

  constructor( private actRou: ActivatedRoute ){ }

  ngOnInit(): void {
    this.actRou.params.subscribe( params => {
      console.log( params );
      this.termino = params.termino;
    } );
  }

}
