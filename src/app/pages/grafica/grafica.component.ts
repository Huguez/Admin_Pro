import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet, Color } from 'ng2-charts';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styles: [
  ]
})
export class GraficaComponent implements OnInit {
  
  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: MultiDataSet = [ [350, 450, 100] ];
  public colors: Color[] = [ { backgroundColor: [ '#9E120E', '#FF5800', '#FFB414' ] } ];
  

  constructor() { }

  ngOnInit(): void {
  }

  
}
