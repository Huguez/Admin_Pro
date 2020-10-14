import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent {

  @Input('valor') progreso: number = 40;
  // @Input() progreso: number = 40;

  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter<number>();

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
}
