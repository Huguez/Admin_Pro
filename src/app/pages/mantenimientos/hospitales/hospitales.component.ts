import { Component, OnInit } from '@angular/core';
import { HospitalesService } from '../../../services/hospitales.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {
  
  public cargando: boolean = false;
  public hospitales: any;
  public desde: any;

  constructor(private _hs:HospitalesService ) { }

  ngOnInit(): void {
    this._hs.cargarHospitales().subscribe(
      hospitales => {
        console.log( hospitales );
        
      }
    )
  }

}
