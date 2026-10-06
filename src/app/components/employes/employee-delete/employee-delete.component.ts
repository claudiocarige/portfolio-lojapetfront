import { Component, OnInit      } from '@angular/core';
import { CommonModule         } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Employee               } from 'src/app/models/modelEmployee';
import { EmployeesService       } from 'src/app/services/employees.service';

@Component({
  selector:    'app-employee-delete',
  standalone:   true,
  imports:   [CommonModule, RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatCheckboxModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employee-delete.component.html',
  styleUrls:  ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {
  employee: Employee = {
    id:           '',
    name:         '',
    cpf:          '',
    email:        '',
    password:     '',
    profile:      [],
    criationDate: ''
  }

  check: string
  constructor(
    private service:      EmployeesService,
    private route:                  Router,
    private activeRoute:    ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.employee.id = this.activeRoute.snapshot.paramMap.get('id');
    this.findById();
  }

  findById() {
    this.service.findById(this.employee.id).subscribe(resposta => {
      resposta.profile = [];
      this.employee = resposta;
    })
  }
  delete(): void {
    this.service.delete(this.employee.id).subscribe(() => {
      //this.toast.success('Funcionário deletado com sucesso!', 'D E L E Ç Ã O');
      this.route.navigate(['employees'])
    }, ex => {
      console.log(ex.error.errors);
      if (ex.error.errors) {
        ex.error.errors.array.forEach(element => {
          //this.toast.error(element.message, "A T E N Ç Ã O !", {timeOut: 5000});
        });
      } else {
       // this.toast.error(ex.error.message, "A T E N Ç Ã O !", {timeOut: 5000});
      }
    })
  }

  addCheck(): boolean{
   return this.employee.name === this.check
  }
  validation(): boolean{
    return this.employee.name === this.check
  }
}
