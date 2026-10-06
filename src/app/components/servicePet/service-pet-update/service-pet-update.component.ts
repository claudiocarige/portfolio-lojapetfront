import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Client } from 'src/app/models/modelClient';
import { Employee } from 'src/app/models/modelEmployee';
import { ServicePet } from 'src/app/models/moodelServicePet';
import { ClientsService } from 'src/app/services/clients.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { ServicePetService } from 'src/app/services/service-pet.service';

@Component({
  selector: 'app-service-pet-update',
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './service-pet-update.component.html',
  styleUrl: './service-pet-update.component.css'
})
export class ServicePetUpdateComponent implements OnInit {

  servicePet: ServicePet = {
    priority:     "",
    status:       "",
    title:        "",
    comments:     "",
    client:       "",
    employee:     "", 
    nameClient:   "",
    nameEmploye:  ""
  }
clientList:     Client [] = []
employeeList: Employee [] = []

priority:         UntypedFormControl = new UntypedFormControl(null, Validators.required);
status:           UntypedFormControl = new UntypedFormControl(null, Validators.required);
title:            UntypedFormControl = new UntypedFormControl(null, [Validators.required, Validators.minLength(4)]);
clientValida:     UntypedFormControl = new UntypedFormControl(null, Validators.required);
employeeValida:   UntypedFormControl = new UntypedFormControl(null, Validators.required);
descri:           UntypedFormControl = new UntypedFormControl(null, [Validators.required, Validators.minLength(10)]);


  private readonly clientService = inject(ClientsService);
  private readonly employeeService = inject(EmployeesService);
  private readonly servicePetService = inject(ServicePetService);
  private readonly route = inject(Router);
  private readonly actvateRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.servicePet.id = this.actvateRoute.snapshot.paramMap.get('id');
    this.loadInitialData();
  }

  loadInitialData(): void {
    forkJoin({
      clients: this.clientService.findAll(),
      employees: this.employeeService.findAll(),
      servicePet: this.servicePetService.findById(this.servicePet.id)
    })
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: ({ clients, employees, servicePet }) => {
        this.clientList = clients;
        this.employeeList = employees;
        this.servicePet = servicePet;
        this.priority.setValue(String(servicePet.priority));
        this.status.setValue(String(servicePet.status));
        this.title.setValue(servicePet.title);
        this.clientValida.setValue(String(servicePet.client));
        this.employeeValida.setValue(String(servicePet.employee));
        this.descri.setValue(servicePet.comments);
      },
      error: (ex) => {
        console.error('Erro ao carregar dados do serviço:', ex);
      }
    });
  }

  update(): void {
    this.servicePetService.update(this.servicePet)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.route.navigate(['services']);
        },
        error: (ex) => {
          console.error('Erro ao atualizar serviço:', ex);
        }
      });
  }

validaForm(): boolean{
  return this.priority.valid && 
         this.status.valid && 
         this.title.valid && 
         this.clientValida.valid &&
         this.employeeValida.valid && 
         this.descri.valid;               
}

retornaPriority(priority: any): string{
  switch(priority){
    case 0:
      return 'BAIXA'
      break;
    case 1:
      return 'MEDIA'
      break;
    case  2: 
      return 'ALTA'
      break;
      default:
        return 'SEM PRIORIDADE'
  }
}
retornaStatus(status: any): string{
  switch(status){
    case 0:
      return 'ABERTO'
      break;
    case 1:
      return 'ANDAMENTO'
      break;
    case  2: 
      return 'ENCERRADO'
      break;
      default:
        return 'SEM STATUS'
  }
}
}

