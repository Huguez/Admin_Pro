import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnInit {

  
  constructor( public mis:ModalImagenService ) { }

  ngOnInit(): void {
  }
  
  cerraModal(){
    this.mis.cerraModal(); 
  }
  

}
