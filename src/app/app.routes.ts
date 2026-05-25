import { Routes } from '@angular/router';
import { HomeprincipalComponent } from './features/home/homeprincipal/homeprincipal.component';
import { CreateClienteComponent } from './features/create-cliente/create-cliente.component';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeprincipalComponent },
  { path: 'criar-cliente', component: CreateClienteComponent },
];
