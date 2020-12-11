import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnInit {

  public imagenSubida: File;
  public imgTemp:      any; 

  
  constructor( public mis:ModalImagenService ) { }

  ngOnInit(): void {
  }
  
  cerraModal(){
    this.imgTemp = null;
    this.mis.cerraModal(); 
  }
  
  
  cambiarImagen( file: File ){
    this.imagenSubida = file;
    
    if( !this.imagenSubida ){
      return this.imgTemp = null;
    }
    
    const reader = new FileReader();
    
    reader.onloadend = () => {
      this.imgTemp = reader.result;  
    }
    
    console.log( this.imagenSubida );
    
    
  }

}
