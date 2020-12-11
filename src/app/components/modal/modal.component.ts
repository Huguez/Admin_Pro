import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import Swal from 'sweetalert2';
import { FileuploadService } from '../../services/fileupload.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnInit {

  public imagenSubida: File;
  public imgTemp:      any; 

  
  constructor( public mis:ModalImagenService, private _fs: FileuploadService ) { }

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
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;  
    }

  }

  subirImagen(){
    const id = this.mis.id;
    const tipo = this.mis.tipo;

    this._fs.actualizarFoto( this.imagenSubida, tipo, id ).then( resp => {
        
      Swal.fire( 'Guardado!!!', 'Imagen subida con exito', 'success');
      this.mis.imagenDone.emit( resp );
      this.cerraModal();

    } ).catch( error => {
      console.log( error );
      Swal.fire( 'Error!!!', 'No se pudo subir la imagen', 'error' );
    } )

  }


}
