import { NgModule } from '@angular/core';

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
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';
import { RouterModule, Routes } from '@angular/router';

const childRouter:Routes = [
  { 
    path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
    { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Acount Settings' } },
    { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Buscar' } },
    { path: 'grafica1', component: GraficaComponent, data: { titulo: 'Graficas' } },
    { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil' }  },
    { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress Bar' } },
    { path: 'promesa', component: PromesasComponent, data: { titulo: 'Promesas' } },
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },

    //Mantenimiento
    { path: 'medicos',    component: MedicosComponent ,   data: { titulo: 'Medicos de aplicacion' } },
    { path: 'medico/:id',    component: MedicoComponent ,   data: { titulo: 'Medico ' } },
    { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales de aplicacion' } },
    
    /// rutas de admin
    { path: 'usuarios', canActivate: [ AdminGuard ],  component: UsuariosComponent,   data: { titulo: 'Usuarios de aplicacion' } },
]


@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild( childRouter ) ],
    exports: [ RouterModule ]
})
export class ChildRoutesModule { }
