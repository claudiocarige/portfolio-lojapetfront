import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/nav/nav.component').then(m => m.NavComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(m => m.HomeComponent)
      },

      // Rotas para Portfólio
      {
        path: 'portfolio',
        loadComponent: () =>
          import('./components/portfolio/portfolio-home/portfolio-home.component').then(m => m.PortfolioHomeComponent)
      },
      {
        path: 'portfolio/sobremim',
        loadComponent: () =>
          import('./components/portfolio/sobremim/sobremim.component').then(m => m.SobremimComponent)
      },
      {
        path: 'portfolio/experiencias',
        loadComponent: () =>
          import('./components/portfolio/experiencias/experiencias.component').then(m => m.ExperienciasComponent)
      },
      {
        path: 'portfolio/formacao',
        loadComponent: () =>
          import('./components/portfolio/formacao/formacao.component').then(m => m.FormacaoComponent)
      },
      {
        path: 'portfolio/habilidades',
        loadComponent: () =>
          import('./components/portfolio/habilidades/habilidades.component').then(m => m.HabilidadesComponent)
      },

      // Rotas para Employees
      {
        path: 'employees',
        loadComponent: () =>
          import('./components/employes/employee-list/employee-list.component').then(m => m.EmployeeListComponent)
      },
      {
        path: 'employees/create',
        loadComponent: () =>
          import('./components/employes/employee-create/employee-create.component').then(m => m.EmployeeCreateComponent)
      },
      {
        path: 'employees/update/:id',
        loadComponent: () =>
          import('./components/employes/employee-update/employee-update.component').then(m => m.EmployeeUpdateComponent)
      },
      {
        path: 'employees/delete/:id',
        loadComponent: () =>
          import('./components/employes/employee-delete/employee-delete.component').then(m => m.EmployeeDeleteComponent)
      },

      // Rotas para Clients
      {
        path: 'clients',
        loadComponent: () =>
          import('./components/clients/client-list/client-list.component').then(m => m.ClientListComponent)
      },
      {
        path: 'clients/create',
        loadComponent: () =>
          import('./components/clients/client-create/client-create.component').then(m => m.ClientCreateComponent)
      },
      {
        path: 'clients/update/:id',
        loadComponent: () =>
          import('./components/clients/client-update/client-update.component').then(m => m.ClientUpdateComponent)
      },
      {
        path: 'clients/delete/:id',
        loadComponent: () =>
          import('./components/clients/client-delete/client-delete.component').then(m => m.ClientDeleteComponent)
      },

      // Rotas para Serviços
      {
        path: 'services',
        loadComponent: () =>
          import('./components/servicePet/service-pet-list/service-pet-list.component').then(m => m.ServicePetListComponent)
      },
      {
        path: 'services/create',
        loadComponent: () =>
          import('./components/servicePet/service-pet-create/service-pet-create.component').then(m => m.ServicePetCreateComponent)
      },
      {
        path: 'services/update/:id',
        loadComponent: () =>
          import('./components/servicePet/service-pet-update/service-pet-update.component').then(m => m.ServicePetUpdateComponent)
      },

      // Rota de contato
      {
        path: 'contact',
        loadComponent: () =>
          import('./components/contacts/contact/contact.component').then(m => m.ContactComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

