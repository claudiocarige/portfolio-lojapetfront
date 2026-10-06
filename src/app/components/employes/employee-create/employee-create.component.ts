import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/modelEmployee';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employee-create',
  imports: [RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatCheckboxModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.css'
})
export class EmployeeCreateComponent implements OnInit {

  employee: Employee = {
    id:           '',
    name:         '',
    cpf:          '',
    email:        '',
    password:     '',
    profile:      ['TECNICO'],
    criationDate: ''
  }
  name:     UntypedFormControl = new UntypedFormControl(null, Validators.minLength(3));
  cpf:      UntypedFormControl = new UntypedFormControl(null,[Validators.required, Validators.minLength(11)]);
  email:    UntypedFormControl = new UntypedFormControl(null,        Validators.email);
  password: UntypedFormControl = new UntypedFormControl(null, Validators.minLength(6));

  constructor(
    private service: EmployeesService,
    private route:             Router
  ) { }

  ngOnInit(): void {
  }
  create(): void {
    this.service.create(this.employee).subscribe(() => {
      //this.toast.success('Funcionário criado com sucesso!', 'C A D A S T R O')
      this.route.navigate(['employees']);
    }, ex => {
      console.log(ex);
      if (ex.error.erros) {
        ex.error.erros.array.forEach(element => {
          //this.toast.error(element.message, "A T E N Ç Ã O !");
        });
      } else {
        //this.toast.error(ex.error.message, "A T E N Ç Ã O !");
      }
    })
  }

  addPerfil(profile: any): void {
    if (this.employee.profile.includes(profile)) {
      this.employee.profile.splice(this.employee.profile.indexOf(profile), 1);
    } else {
      this.employee.profile.push(profile);
    }
  }
  validation(): boolean {
    return this.name.valid && this.cpf.valid && this.email.valid && this.password.valid;
  }
}
