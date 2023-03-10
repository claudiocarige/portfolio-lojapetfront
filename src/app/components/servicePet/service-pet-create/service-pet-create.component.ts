import { Component, OnInit        } from '@angular/core';
import { FormControl, Validators  } from '@angular/forms';
import { Router                   } from '@angular/router';
import { ToastrService            } from 'ngx-toastr';
import { Client                   } from 'src/app/models/modelClient';
import { Employee                 } from 'src/app/models/modelEmployee';
import { ServicePet               } from 'src/app/models/moodelServicePet';
import { ClientsService           } from 'src/app/services/clients.service';
import { EmployeesService         } from 'src/app/services/employees.service';
import { ServicePetService        } from 'src/app/services/service-pet.service';

@Component({
  selector:    'app-service-pet-create',
  templateUrl: './service-pet-create.component.html',
  styleUrls:  ['./service-pet-create.component.css']
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

priority:         FormControl = new FormControl(null, Validators.required);
status:           FormControl = new FormControl(null, Validators.required);
title:            FormControl = new FormControl(null, [Validators.required, Validators.minLength(6)]);
clientValida:     FormControl = new FormControl(null, Validators.required);
employeeValida:   FormControl = new FormControl(null, Validators.required);
descri:           FormControl = new FormControl(null, [Validators.required, Validators.minLength(20)]);


  constructor(
    private     clientService:    ClientsService,
    private   employeeService:  EmployeesService,
    private servicePetService: ServicePetService,
    private             toast:     ToastrService,
    private             route:            Router
  ) { }

  ngOnInit(): void {
    this.findAllClients();
    this.findAllEmployee();
  }

  create(): void{
    this.servicePetService.create(this.servicePet).subscribe(response =>{
      this.toast.success("Servi??o cadastrado com sucesso.", "C A D A S T R O")
      this.route.navigate(["services"]);
    }, ex => {
      console.log(ex.error.errors);
      if (ex.error.errors) {
        ex.error.errors.array.forEach(element => {
          this.toast.error(element.message, "A T E N ?? ?? O !");
        });
      } else {
        this.toast.error(ex.error.message, "A T E N ?? ?? O !");
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
}
