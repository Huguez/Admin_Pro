import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaComponent } from './grafica/grafica.component';

const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        children: [
          { path: '', component: DashboardComponent },
          { path: 'progress', component: ProgressComponent },
          { path: 'grafica1', component: GraficaComponent },
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule { }
  