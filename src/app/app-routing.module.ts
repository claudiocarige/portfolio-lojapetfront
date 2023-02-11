import { NgModule                   } from '@angular/core';
import { RouterModule, Routes       } from '@angular/router';
import { AuthGuard                  } from './auth/auth.guard';
import { ClientCreateComponent      } from './components/clients/client-create/client-create.component';
import { ClientDeleteComponent } from './components/clients/client-delete/client-delete.component';
import { ClientListComponent        } from './components/clients/client-list/client-list.component';
import { ClientUpdateComponent      } from './components/clients/client-update/client-update.component';
import { ContactComponent } from './components/contacts/contact/contact.component';
import { EmployeeCreateComponent    } from './components/employes/employee-create/employee-create.component';
import { EmployeeDeleteComponent    } from './components/employes/employee-delete/employee-delete.component';
import { EmployeeListComponent      } from './components/employes/employee-list/employee-list.component';
import { EmployeeUpdateComponent    } from './components/employes/employee-update/employee-update.component';
import { HomeComponent              } from './components/home/home.component';
import { LoginComponent             } from './components/login/login.component';
import { NavComponent               } from './components/nav/nav.component';
import { ExperienciasComponent      } from './components/portfolio/experiencias/experiencias.component';
import { FormacaoComponent          } from './components/portfolio/formacao/formacao.component';
import { HabilidadesComponent       } from './components/portfolio/habilidades/habilidades.component';
import { PortfolioHomeComponent     } from './components/portfolio/portfolio-home/portfolio-home.component';
import { SobremimComponent          } from './components/portfolio/sobremim/sobremim.component';
import { ServicePetCreateComponent } from './components/servicePet/service-pet-create/service-pet-create.component';
import { ServicePetListComponent } from './components/servicePet/service-pet-list/service-pet-list.component';
import { ServicePetUpdateComponent } from './components/servicePet/service-pet-update/service-pet-update.component';

const routes: Routes = [
  { path: "login", component:LoginComponent},
  { path: "",   component: NavComponent, canActivate:[AuthGuard],  children : [
        { path: "home",       component: HomeComponent},
        
        //Rotas para Portfólio
        {path: "portfolio",               component:       PortfolioHomeComponent},
        { path: "portfolio/sobremim",     component:            SobremimComponent},
        { path: "portfolio/experiencias", component:        ExperienciasComponent},
        { path: "portfolio/formacao",     component:            FormacaoComponent},
        { path: "portfolio/habilidades",  component:         HabilidadesComponent},

        //Rotas para Employees
        { path: "employees",              component:        EmployeeListComponent},      
        { path: "employees/create",       component:      EmployeeCreateComponent},
        { path: "employees/update/:id",   component:      EmployeeUpdateComponent},
        { path: "employees/delete/:id",   component:      EmployeeDeleteComponent},
      
         //Rotas para Clients
        { path: "clients",                component:          ClientListComponent},
        { path: "clients/create",         component:        ClientCreateComponent},  
        { path: "clients/update/:id",     component:        ClientUpdateComponent},  
        { path: "clients/delete/:id",     component:        ClientDeleteComponent},

         //Rotas para Serviços
         { path: "services",     component:               ServicePetListComponent},
         { path: "services/create",     component:      ServicePetCreateComponent},
         { path: "services/update/:id",     component:  ServicePetUpdateComponent},
   

         //Rota de contato
        { path: "contact",  component:        ContactComponent},

  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
