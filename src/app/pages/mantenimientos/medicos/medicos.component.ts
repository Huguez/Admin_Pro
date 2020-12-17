import { Component, OnDestroy, OnInit } from '@angular/core';
import { MedicosService } from '../../../services/medicos.service';
import { Medico } from '../../../models/medico.model';
import { BusquedaService } from '../../../services/busqueda.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

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
      this._medicosAux = resp;
      this.cargando = false;
    } );
  }
  
  buscar( termino ){
    if( termino == ''  ){
      this.medicos = this._medicosAux;
      return ;
    }

    this._bs.buscar( 'medicos', termino ).subscribe( ( resp:any ) => {
      if( resp.length == 0 ){
        this.medicos = this._medicosAux;
      }else{
        this.medicos = resp;
      }
    } )
  }
  
  eliminarMedico( medico : Medico ){

  }

  editarMedico( medico: Medico ){
    
    this._mss.actualizarMedico( medico ).subscribe( ( resp:any ) => {
      console.log( resp );  
    } );

  }

  abrirModal( medico: Medico ){
    this._mis.abrirModal('medicos', medico.id, medico.img );
  }

}
