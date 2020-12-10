import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnInit {

  public oculto: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }
  
  cerraModal(){
    this.oculto = false;
  }
}
