import { Component, OnInit } from '@angular/core';
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


  constructor(
    private     clientService:    ClientsService,
    private   employeeService:  EmployeesService,
    private servicePetService: ServicePetService,
    private             route:            Router,
    private      actvateRoute:    ActivatedRoute 
  ) { }

  ngOnInit(): void {
    this.servicePet.id = this.actvateRoute.snapshot.paramMap.get('id');
    this.findAllClients();
    this.findAllEmployee();
    this.findById();    
  }

  update(): void {
    this.servicePetService.update(this.servicePet).subscribe({
      next: () => {
        this.route.navigate(['services']);
      },
      error: (ex) => {
        console.error('Erro ao atualizar serviço:', ex);
      }
    });
  }
  findById(): void {
    this.servicePetService.findById(this.servicePet.id).subscribe({
      next: (response) => {
        this.servicePet = response;
        this.priority.setValue(String(response.priority));
        this.status.setValue(String(response.status));
        this.title.setValue(response.title);
        this.clientValida.setValue(String(response.client));
        this.employeeValida.setValue(String(response.employee));
        this.descri.setValue(response.comments);
      },
      error: (ex) => {
        console.error('Erro ao buscar serviço:', ex);
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

findAllClients(){
  this.clientService.findAll().subscribe(response => {
    this.clientList = response;
  })
}

findAllEmployee(){
  this.employeeService.findAll().subscribe(response => {
    this.employeeList = response;
  })
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

