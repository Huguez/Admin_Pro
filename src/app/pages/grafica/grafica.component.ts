import { Component, OnInit } from '@angular/core';
import { MultiDataSet, Color } from 'ng2-charts';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styles: [
  ]
})
export class GraficaComponent implements OnInit {
  
  public L = ['tako', 'chorizo', 'empanada'];
  public D = [ [ 35, 4, 1] ];
  public labels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public data1: MultiDataSet = [ [350, 450, 100] ];
  
  
  constructor() { }

  ngOnInit(): void {
  }

  
}
