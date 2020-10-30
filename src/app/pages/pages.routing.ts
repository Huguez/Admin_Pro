import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaComponent } from './grafica/grafica.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';

import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
          { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
          { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress Bar' } },
          { path: 'grafica1', component: GraficaComponent, data: { titulo: 'Graficas' } },
          { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Acount Settings' } },
          { path: 'promesa', component: PromesasComponent, data: { titulo: 'Promesas' } },
          { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule { }
  