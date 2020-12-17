import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {
  
  public cargando: boolean = true;
  private _id: string;

  constructor( private actRou: ActivatedRoute ) { }

  ngOnInit(): void {
    this._id =this.actRou.snapshot.paramMap.get( "id" );
  }

}
