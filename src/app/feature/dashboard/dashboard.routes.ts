
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

export const DASHBOARD_ROUTES = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
];
