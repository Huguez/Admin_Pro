import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';

import { NoPageFoundComponent } from './404/no-page-found.component';
import { SharedModule } from './shared/shared.module';
import { ComponentsModule } from './components/components.module';



@NgModule({
  declarations: [
    AppComponent,

    NoPageFoundComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    SharedModule,
    AuthModule,
    ComponentsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
