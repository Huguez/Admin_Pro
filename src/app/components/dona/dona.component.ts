import { Component, Input, OnInit } from '@angular/core';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input() public titulo: string = "Sin titulo";
  @Input() public etiquetas: Label[] = [];
  @Input() public datos: MultiDataSet = [];
  
  public colors: Color[] = [ { backgroundColor: [ '#9E120E', '#FF5800', '#FFB414' ] } ];
  
  ngOnInit(): void {
  }

}
