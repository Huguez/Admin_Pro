import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {
  
  public cargando: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
