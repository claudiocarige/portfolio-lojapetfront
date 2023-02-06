import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { EmployeeCreateComponent } from './components/employes/employee-create/employee-create.component';
import { EmployeeListComponent } from './components/employes/employee-list/employee-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';

const routes: Routes = [
  { path: "login", component:LoginComponent},
  { path:"", component: NavComponent, canActivate:[AuthGuard],  children : [
        { path: "home",       component: HomeComponent},
        { path: "employees",  component: EmployeeListComponent},      
        { path: "employees/create", component: EmployeeCreateComponent}
      
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
