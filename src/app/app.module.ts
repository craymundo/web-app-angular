import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { LoginComponent } from './feature/login/login.component';
import { DashboardService } from './core/services/dashboard.service';
import { HttpService } from './core/http/http.service';

import { DataTablesModule } from "angular-datatables";
import { HomeComponent } from './feature/dashboard/home/home.component';
import { ReplaceNullPipe } from './shared/pipes/replace-null.pipe';


import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  exports: [],
  providers: [ DashboardService, HttpService, ReplaceNullPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
