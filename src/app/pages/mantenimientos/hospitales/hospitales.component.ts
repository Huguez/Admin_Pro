import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {
  
  public cargando: boolean = true;
  public hospitales: any;
  public desde: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
