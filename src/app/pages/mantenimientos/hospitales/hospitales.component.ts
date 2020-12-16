import { Component, OnInit } from '@angular/core';
import { HospitalesService } from '../../../services/hospitales.service';
import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {
  
  public cargando: boolean;
  public hospitales: Hospital[];
  public desde: any;

  constructor(private _hs:HospitalesService ) { }

  ngOnInit(): void {
    this.cargarHospitales();
  }

  cargarHospitales(){
    this.cargando = true;
    this._hs.cargarHospitales().subscribe( hospitales => {     
      
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  
}
