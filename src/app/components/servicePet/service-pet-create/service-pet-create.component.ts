import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-service-pet-create',
  imports: [
    RouterModule,
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

  readonly priority = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  readonly status = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  readonly title = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] });
  readonly clientValida = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  readonly employeeValida = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  readonly descri = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(20)] });

  private readonly clientService = inject(ClientsService);
  private readonly employeeService = inject(EmployeesService);
  private readonly servicePetService = inject(ServicePetService);
  private readonly route = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toast = inject(ToastService);

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
        this.toast.error('Erro ao carregar lista de clientes e funcionários!');
      }
    });
  }

  create(): void {
    if (!this.validaForm()) {
      return;
    }

    const newServicePet: ServicePet = {
      ...this.servicePet,
      title: this.title.value,
      status: this.status.value,
      priority: this.priority.value,
      client: this.clientValida.value,
      employee: this.employeeValida.value,
      comments: this.descri.value
    };

    this.servicePetService.create(newServicePet)
      .subscribe({
        next: () => {
          this.toast.success('Serviço cadastrado com sucesso!');
          this.route.navigate(['/services']);
        },
        error: (ex) => {
          console.error('Erro ao cadastrar serviço:', ex);
          const msg = ex.error?.message || 'Erro ao cadastrar serviço!';
          this.toast.error(msg);
        }
      });
  }

  validaForm(): boolean {
    return this.priority.valid && 
           this.status.valid && 
           this.title.valid && 
           this.clientValida.valid &&
           this.employeeValida.valid && 
           this.descri.valid;               
  }
}
