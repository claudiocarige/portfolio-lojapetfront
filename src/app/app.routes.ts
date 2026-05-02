import { Routes } from '@angular/router';
import { HomeprincipalComponent } from './features/home/homeprincipal/homeprincipal.component';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeprincipalComponent },
];
