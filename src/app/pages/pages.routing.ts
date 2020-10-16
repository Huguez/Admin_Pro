import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaComponent } from './grafica/grafica.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';

const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        children: [
          { path: '', component: DashboardComponent },
          { path: 'progress', component: ProgressComponent },
          { path: 'grafica1', component: GraficaComponent },
          { path: 'account-settings', component: AccountSettingsComponent },
          { path: 'promesa', component: PromesasComponent },
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule { }
  