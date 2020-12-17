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
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';

const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil' }  },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress Bar' } },
            { path: 'grafica1', component: GraficaComponent, data: { titulo: 'Graficas' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Acount Settings' } },
            { path: 'promesa', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },

            //Mantenimiento
            { path: 'usuarios',   component: UsuariosComponent,   data: { titulo: 'Usuarios de aplicacion' } },
            { path: 'medicos',    component: MedicosComponent ,   data: { titulo: 'Medicos de aplicacion' } },
            { path: 'medico/:id',    component: MedicoComponent ,   data: { titulo: 'Medico ' } },
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales de aplicacion' } },
            
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule { }
  