// modulos de Angunlar
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// modulos de terceros
import { ChartsModule } from 'ng2-charts';

// mis Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { PagesComponent } from './pages.component';
import { GraficaComponent } from './grafica/grafica.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraficaComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    SharedModule, 
    AppRoutingModule,
    ComponentsModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraficaComponent,
    PagesComponent
  ]
})
export class PagesModule { }
