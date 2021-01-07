import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedaService } from '../../services/busqueda.service';

import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';
import { UsuariosComponent } from '../mantenimientos/usuarios/usuarios.component';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {
  
  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor( private actRou: ActivatedRoute, private _bs: BusquedaService ){ }

  ngOnInit(): void {
    this.actRou.params.subscribe( params => this.busquedaMasiva( params.termino )  );
  }

  busquedaMasiva( termino: string ){
    this._bs.busquedaGlobal( termino ).subscribe( ( resp:any ) => {
      console.log( resp.usuarios );
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
    } );

  }

  abrirMedico( medico:any ){
    console.log(medico);
    
  }

}
