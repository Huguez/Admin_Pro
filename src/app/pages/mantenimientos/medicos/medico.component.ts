import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalesService } from '../../../services/hospitales.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {
  
  public medicoForm: FormGroup;
  public hospitales: Hospital[];

  constructor( private _hs: HospitalesService, private fb:FormBuilder ) { this.cargarHospitales(); }

  ngOnInit(): void {
  
    this.medicoForm = this.fb.group( {
      nombre: ['', Validators.required ],
      hospital: ['', Validators.required],

    } )
  }

  guardarMedico(){
    console.log( this.medicoForm.value );
    
  }
  
  cargarHospitales(){
    this._hs.cargarHospitales().subscribe( ( resp:any ) => {
      this.hospitales = resp;   
    });
  }

}
