import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/modelClient';
import { Employee } from 'src/app/models/modelEmployee';
import { ServicePet } from 'src/app/models/moodelServicePet';
import { ClientsService } from 'src/app/services/clients.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { ServicePetService } from 'src/app/services/service-pet.service';

@Component({
  selector: 'app-service-pet-update',
  templateUrl: './service-pet-update.component.html',
  styleUrls: ['./service-pet-update.component.css']
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
clientList: Client [] = []
employeeList: Employee [] = []

priority:         FormControl = new FormControl(null, Validators.required);
status:           FormControl = new FormControl(null, Validators.required);
title:            FormControl = new FormControl(null, [Validators.required, Validators.minLength(4)]);
clientValida:     FormControl = new FormControl(null, Validators.required);
employeeValida:   FormControl = new FormControl(null, Validators.required);
descri:           FormControl = new FormControl(null, [Validators.required, Validators.minLength(10)]);


  constructor(
    private  clientService: ClientsService,
    private employeeService: EmployeesService,
    private servicePetService: ServicePetService,
    private toast: ToastrService,
    private route: Router,
    private actvateRoute: ActivatedRoute 
  ) { }

  ngOnInit(): void {
    this.servicePet.id = this.actvateRoute.snapshot.paramMap.get('id');
    this.findAllClients();
    this.findAllEmployee();
    this.findById();    
  }

  update(): void{
    this.servicePetService.update(this.servicePet).subscribe(response =>{
      this.toast.success("Serviço atualizado com sucesso.", "A T U A L I Z A Ç Ã O")
      this.route.navigate(["services"]);
    }, ex => {
      console.log(ex.error.errors);
      if (ex.error.errors) {
        ex.error.errors.array.forEach(element => {
          this.toast.error(element.message, "A T E N Ç Ã O !");
        });
      } else {
        this.toast.error(ex.error.message, "A T E N Ç Ã O !");
      }
      });
  }
findById(){
  this.servicePetService.findById(this.servicePet.id).subscribe(response => {
    this.servicePet = response
  })
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

