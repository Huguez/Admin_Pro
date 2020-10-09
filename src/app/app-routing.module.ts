import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { PagesRoutingModule } from './pages/pages.routing';

import { NoPageFoundComponent } from './404/no-page-found.component';
import { AuthRoutingModule } from './auth/auth.routing';

const routes: Routes = [  
  // path: /dashboard, PagesRouting
  // path: /auth,      AuthRouting
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NoPageFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [ 
    RouterModule.forRoot( routes ),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
