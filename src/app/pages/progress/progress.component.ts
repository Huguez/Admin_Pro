import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css']
})
export class ProgressComponent {
  
  progreso: number = 25;
  progreso2: number = 40;
  
  getProgreso_1(){
    return `${this.progreso}%`;
  }

  getProgreso_2(){
    return `${this.progreso2}%`;
  }

}
