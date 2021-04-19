import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './feature/login/login.component';
import { NotFoundComponent } from './shared/views/not-found/not-found.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { DASHBOARD_ROUTES } from './feature/dashboard/dashboard.routes';
import { DataTablesModule } from 'angular-datatables';

export const routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },

  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: DASHBOARD_ROUTES,
  },
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  imports: [ DataTablesModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
