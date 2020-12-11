import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  
  private _ocultarModal: boolean = true;
  public tipo: string;
  public id: string;
  public img: string;
  
  private base_url = "http://localhost:3005/api/upload";
  
  get ocultarModal(){
    return this._ocultarModal;
  }
  
  abrirModal( tipo: 'usuarios'|'medicos'|'hospitales', id: string, img:string = 'no-img' ){
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;

    if( img.includes( 'http' ) ){
      this.img = img;
    }else {
      this.img = `${ this.base_url }/${ tipo }/${ img }`;
    }
    console.log(this.img);
    
  }

  cerraModal(){
    this._ocultarModal = true;
  }

  constructor() { }

}
