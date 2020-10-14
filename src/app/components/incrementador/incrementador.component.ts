import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @Input('valor') progreso: number = 40;
  @Input() btnClass: string = 'btn-primary';

  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter<number>();
  
  ngOnInit(){
    this.btnClass = `btn ${ this.btnClass }`;
  }

  getPorcentaje() {
    return `${this.progreso}%`;
  }

  cambiarValor( valor: number ){
    
    if( this.progreso + valor >= 100 ){
      this.progreso = 100;
      this.valorSalida.emit( this.progreso );
      return;
    }

    if( this.progreso + valor <= 0 ){
      this.progreso = 0;
      this.valorSalida.emit( this.progreso );
      return;
    }
    
    this.progreso += valor;
    this.valorSalida.emit( this.progreso );  
  }

  onChange( nuevoValor: number ){
    if( nuevoValor >= 100 ){
      this.progreso = 100;
    }else if( nuevoValor <= 0 || nuevoValor === null ){
      this.progreso = 0;
    }else{
      this.progreso = nuevoValor;
    }
    
    this.valorSalida.emit( this.progreso );  
  }


}
