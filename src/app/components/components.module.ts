import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';

// modulos de terceros
import { ChartsModule } from 'ng2-charts';

// mis componentes
import { DonaComponent } from './dona/dona.component';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [IncrementadorComponent, DonaComponent, ModalComponent],
  imports: [
    FormsModule,
    ChartsModule,
    CommonModule
  ],
  exports: [ IncrementadorComponent, DonaComponent, ModalComponent ]
})
export class ComponentsModule { }
