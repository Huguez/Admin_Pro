import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';

// modulos de terceros
import { ChartsModule } from 'ng2-charts';

// mis componentes
import { DonaComponent } from './dona/dona.component';



@NgModule({
  declarations: [IncrementadorComponent, DonaComponent],
  imports: [
    FormsModule,
    ChartsModule,
    CommonModule
  ],
  exports: [ IncrementadorComponent, DonaComponent ]
})
export class ComponentsModule { }
