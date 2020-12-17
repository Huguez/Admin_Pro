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
  public hospitales: Hospital[]=[];
  public hospitalSeleccionado: Hospital;
  public cargando: boolean = true;


  constructor( private _hs: HospitalesService, private fb:FormBuilder ) {  }

  ngOnInit(): void {
    this.cargarHospitales();

    this.medicoForm = this.fb.group( {
      nombre: ['', Validators.required ],
      hospital: ['', Validators.required],
    } );

    this.medicoForm.get('hospital').valueChanges.subscribe( hospitalId => {
      console.log( hospitalId );
      this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId );
    } );

  }

  guardarMedico(){
    console.log( this.medicoForm.value );
    
  }
  
  cargarHospitales(){
    this._hs.cargarHospitales().subscribe( ( resp:any ) => {
      this.hospitales = resp;   
      this.cargando = false;
    });
  }

}
