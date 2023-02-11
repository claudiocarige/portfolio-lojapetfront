import { NgModule                } from '@angular/core';
import { BrowserModule           } from '@angular/platform-browser';

import { AppRoutingModule        } from './app-routing.module';
import { AppComponent            } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Import para formularios 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Import para Requisições Http
import { HttpClientModule       } from '@angular/common/http';

//Import para os compnents do Angula Matirial
import { MatFormFieldModule     } from '@angular/material/form-field';
import { MatPaginatorModule     } from '@angular/material/paginator';
import { MatSnackBarModule      } from '@angular/material/snack-bar';
import { MatToolbarModule       } from '@angular/material/toolbar';
import { MatCheckboxModule      } from '@angular/material/checkbox';
import { MatSidenavModule       } from '@angular/material/sidenav';
import { MatButtonModule        } from '@angular/material/button';
import { MatSelectModule        } from '@angular/material/select';
import { MatTableModule         } from '@angular/material/table';
import { MatRadioModule         } from '@angular/material/radio';
import { MatInputModule         } from '@angular/material/input';
import { MatIconModule          } from '@angular/material/icon';
import { MatListModule          } from '@angular/material/list';
import { MatCardModule          } from '@angular/material/card';
import { MatRippleModule        } from '@angular/material/core';
import { MatTooltipModule       } from '@angular/material/tooltip';
import { MatDialogModule        } from '@angular/material/dialog';
import { MatSortModule          } from '@angular/material/sort';


//Outras importações
import { ToastrModule } from 'ngx-toastr';


//Componentes do projeto
import { HomeComponent               } from './components/home/home.component';
import { HeaderComponent             } from './components/header/header.component';
import { NavComponent                } from './components/nav/nav.component';
import { EmployeeListComponent       } from './components/employes/employee-list/employee-list.component';
import { LoginComponent              } from './components/login/login.component';
import { AuthoInterceptorProvider    } from './interceptors/auth.interceptor';
import { EmployeeCreateComponent     } from './components/employes/employee-create/employee-create.component';
import { EmployeeUpdateComponent     } from './components/employes/employee-update/employee-update.component';
import { EmployeeDeleteComponent     } from './components/employes/employee-delete/employee-delete.component';
import { SobremimComponent           } from './components/portfolio/sobremim/sobremim.component'
import { ExperienciasComponent       } from './components/portfolio/experiencias/experiencias.component'
import { FormacaoComponent           } from './components/portfolio/formacao/formacao.component'
import { HabilidadesComponent        } from './components/portfolio/habilidades/habilidades.component'
import { PortfolioHomeComponent      } from './components/portfolio/portfolio-home/portfolio-home.component';
import { DialogModalComponent } from './components/portfolio/dialog-modal/dialog-modal.component';
import { ClientListComponent } from './components/clients/client-list/client-list.component';
import { ClientCreateComponent } from './components/clients/client-create/client-create.component';
import { ClientUpdateComponent } from './components/clients/client-update/client-update.component';
import { ClientDeleteComponent } from './components/clients/client-delete/client-delete.component';
import { ServicePetListComponent } from './components/servicePet/service-pet-list/service-pet-list.component';
import { ServicePetCreateComponent } from './components/servicePet/service-pet-create/service-pet-create.component';
import { ContactComponent } from './components/contacts/contact/contact.component';
import { ServicePetUpdateComponent } from './components/servicePet/service-pet-update/service-pet-update.component';
import { ServicePetDeleteComponent } from './components/servicePet/service-pet-delete/service-pet-delete.component'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    HeaderComponent,
    EmployeeListComponent,
    LoginComponent,
    EmployeeCreateComponent,
    EmployeeUpdateComponent,
    EmployeeDeleteComponent,
    SobremimComponent,
    FormacaoComponent,
    HabilidadesComponent,
    ExperienciasComponent,
    HomeComponent,
    PortfolioHomeComponent,
    DialogModalComponent,
    ClientListComponent,
    ClientCreateComponent,
    ClientUpdateComponent,
    ClientDeleteComponent,
    ServicePetListComponent,
    ServicePetCreateComponent,
    ContactComponent,
    ServicePetUpdateComponent,
    ServicePetDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //forms
    FormsModule,
    ReactiveFormsModule,
    //Requisição Http
    HttpClientModule,
    //Angular Matirial
    MatFormFieldModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatRadioModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatRippleModule,
    MatTooltipModule,
    MatDialogModule,
    MatSortModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      closeButton: true,
      progressBar: true
   })
  ],
  providers: [AuthoInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
