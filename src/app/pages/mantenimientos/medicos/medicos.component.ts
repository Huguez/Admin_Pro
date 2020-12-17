import { Component, OnDestroy, OnInit } from '@angular/core';
import { MedicosService } from '../../../services/medicos.service';
import { Medico } from '../../../models/medico.model';
import { BusquedaService } from '../../../services/busqueda.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando:boolean = true;
  public medicos: Medico[];
  private _medicosAux :Medico[];
  private imagenSubs: Subscription;
  public total:number;

  
  constructor( private _mss: MedicosService, private _bs: BusquedaService, private _mis: ModalImagenService ) { }

  ngOnDestroy(): void {
    this.imagenSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imagenSubs = this._mis.imagenDone.pipe( delay( 1000 ) ).subscribe( img => this.cargarMedicos() );
  }
  
  cargarMedicos(){
    this.cargando = true;
    this._mss.getMedicos().subscribe( ( resp:any ) => {
      this.medicos = resp;
      this.total = resp.length;
      this._medicosAux = resp;
      this.cargando = false;
    } );
  }
  
  buscar( termino:string  ){
    if( termino == ''  ){
      this.medicos = this._medicosAux;
      return ;
    }
    
    this._bs.buscar( 'medicos', termino ).subscribe( ( resp:any ) => {
      if( resp.length == 0 ){
        this.medicos = [];
      }else{
        this.medicos = resp;
        this.total = resp.length;
      }
    } )
  }
  
  eliminarMedico( medico : Medico ){
    Swal.fire({
        title: '¿seguro?',
        text: `¿Estas Seguro de borar a ${ medico.nombre }?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, Borrar'
    }).then( ( result:any ) => {
      if( result.value ){
        this._mss.deleteMedico( medico.id ).subscribe( ( resp: any ) => {
          Swal.fire('Medico Borrado', `${medico.nombre} fue borrado Correctamente`, 'success');
          this.cargarMedicos();
        })    
      }
    })
    
  }

  abrirModal( medico: Medico ){
    this._mis.abrirModal('medicos', medico.id, medico.img );
  }

}
