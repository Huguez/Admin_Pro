import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';
import { HospitalesService } from '../../../services/hospitales.service';
import { MedicosService } from '../../../services/medicos.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  public medicoSeleccionado: Medico; 
  public cargando: boolean = true;
  private id: string = '';

  constructor( 
    private actRou: ActivatedRoute, 
    private router:Router, 
    private _hs:HospitalesService, 
    private fb:FormBuilder, 
    private _ms:MedicosService ){}

  ngOnInit(): void {

    this.actRou.params.subscribe( ( { id } ) => {
      this.cargarMedico( id );
    } );
    
    this.cargarHospitales();

    this.medicoForm = this.fb.group( {
      nombre: ['', Validators.required ],
      hospital: ['', Validators.required],
    } );

    this.medicoForm.get('hospital').valueChanges.subscribe( hospitalId => {
      this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId  );
    } );
    
  }
  
  cargarMedico( id: string ){
    if( id === 'nuevo' ){
      return;
    }

    this._ms.getMedico( id ).subscribe( ( resp:any ) => {
      console.log( resp.ok );
      
      if( !resp.ok ){
        return this.router.navigateByUrl( `/dashboard/medicos` );
      }
      
      this.medicoSeleccionado = resp.medico;
      const { nombre, hospital } = resp.medico;    
      this.medicoForm.setValue( { nombre, hospital } );
    } );
  }

  guardarMedico(){
    
    if( this.medicoSeleccionado ){
      const data: Medico = { ...this.medicoForm.value, id: this.medicoSeleccionado.id };

      this._ms.actualizarMedico( data ).subscribe( ( resp: any ) => {
        if( resp.ok ){
          Swal.fire('Guardado', `Se Actualizo el Medico ${ this.medicoForm.value.nombre }.`, 'success' )
          this.router.navigateByUrl( `/dashboard/medico/${ this.medicoSeleccionado.id }` )
        }
      });
    }else{
      this._ms.crearMedico( this.medicoForm.value ).subscribe( ( resp: any ) => {
        if( resp.ok ){
          Swal.fire('Guardado', `Se Creo el Medico ${ this.medicoForm.value.nombre }.`, 'success' )
          this.router.navigateByUrl( `/dashboard/medico/${ resp.medico.id }` )
        }
      });
    }
  }
  
  cargarHospitales(){
    this._hs.cargarHospitales().subscribe( ( resp:any ) => {
      this.hospitales = resp;   
      this.cargando = false;
    });
  }

}
