import { Component, OnInit, NgModule, OnDestroy } from '@angular/core';
import { HospitalesService } from '../../../services/hospitales.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {
  
  public cargando: boolean;
  public hospitales: Hospital[];
  public desde: any;
  public imgSubs: Subscription;

  constructor(private _hs:HospitalesService, private _mis:ModalImagenService ) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this.imgSubs = this._mis.imagenDone.pipe( delay( 100 ) ).subscribe( img => this.cargarHospitales() );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarHospitales(){
    this.cargando = true;
    this._hs.cargarHospitales().subscribe( hospitales => {     
      
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  guardarCambios( hospital: any ){
    this._hs.actualizarHospital( hospital._id, hospital.nombre ).subscribe( (resp:any) => {
      // console.log( resp );
      Swal.fire('Actualizado', hospital.nombre, 'success' );
      this.cargarHospitales();
    });
  }
  
  eliminar( hospital:any ){
    this._hs.deleteHospital( hospital._id ).subscribe( (resp:any) => {
      // console.log( resp );
      Swal.fire('Borrado!!', hospital.nombre, 'success' );
      this.cargarHospitales();
    } );

  }
  
  abrirModal( hospital:any ){
    this._mis.abrirModal( 'hospitales', hospital._id, hospital.img );
  }


  async crear(){
    const { value: name } = await Swal.fire({
      title: 'Crear Hospital',
      input: 'text',
      inputLabel: 'Introduce el nombre del Hospital',
      showCancelButton: true,
      inputValidator: ( value ) => {
        if (!value) {
          return 'Necesitas ingresar un nombre'
        }
      }
    })
    
    if( name ){
      this._hs.crearHospital( name ).subscribe( ( resp:any )=> {
        console.log( resp );
        // this.cargarHospitales();
        this.hospitales.push( resp.hospital );
      });
    }

  }
  
}
