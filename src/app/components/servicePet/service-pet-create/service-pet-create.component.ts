import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/modelClient';
import { Employee } from 'src/app/models/modelEmployee';
import { ServicePet } from 'src/app/models/moodelServicePet';
import { ClientsService } from 'src/app/services/clients.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { ServicePetService } from 'src/app/services/service-pet.service';

@Component({
  selector: 'app-service-pet-create',
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './service-pet-create.component.html',
  styleUrl: './service-pet-create.component.css'
})
export class ServicePetCreateComponent implements OnInit {

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
title:            UntypedFormControl = new UntypedFormControl(null, [Validators.required, Validators.minLength(6)]);
clientValida:     UntypedFormControl = new UntypedFormControl(null, Validators.required);
employeeValida:   UntypedFormControl = new UntypedFormControl(null, Validators.required);
descri:           UntypedFormControl = new UntypedFormControl(null, [Validators.required, Validators.minLength(20)]);


  private readonly clientService = inject(ClientsService);
  private readonly employeeService = inject(EmployeesService);
  private readonly servicePetService = inject(ServicePetService);
  private readonly route = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    forkJoin({
      clients: this.clientService.findAll(),
      employees: this.employeeService.findAll()
    })
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: ({ clients, employees }) => {
        this.clientList = clients;
        this.employeeList = employees;
      },
      error: (ex) => {
        console.error('Erro ao carregar dados iniciais:', ex);
      }
    });
  }

  create(): void {
    this.servicePetService.create(this.servicePet)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.route.navigate(['services']);
        },
        error: (ex) => {
          console.error('Erro ao cadastrar serviço:', ex);
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
}
