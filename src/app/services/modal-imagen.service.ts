import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  
  private _ocultarModal: boolean = true;
  public tipo: 'usuarios'|'medicos'|'hospitales';
  public id: string;
  public img: string;

  public imagenDone: EventEmitter<string> = new EventEmitter<string>();
  
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
