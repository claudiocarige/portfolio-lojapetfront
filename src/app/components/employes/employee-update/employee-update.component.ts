import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Employee } from 'src/app/models/modelEmployee';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employee-update',
  imports: [RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatCheckboxModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employee-update.component.html',
  styleUrl: './employee-update.component.css'
})
export class EmployeeUpdateComponent implements OnInit {
  employee: Employee = {
    id:           '',
    name:         '',
    cpf:          '',
    email:        '',
    password:     '',
    profile:      [],
    criationDate: ''
  }
  name:     UntypedFormControl = new UntypedFormControl(null, Validators.minLength(3));
  cpf:      UntypedFormControl = new UntypedFormControl(null,     Validators.required);
  email:    UntypedFormControl = new UntypedFormControl(null,        Validators.email);
  password: UntypedFormControl = new UntypedFormControl(null, Validators.minLength(4));

  constructor(
    private service:      EmployeesService,
    private route:        Router,
    private activeRoute:  ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.employee.id = this.activeRoute.snapshot.paramMap.get('id');
    this.findById();
  }

  findById() {
    this.service.findById(this.employee.id).subscribe({
      next: (resposta) => {
        this.employee = {
          ...resposta,
          profile: resposta.profile || ['TECNICO']
        };
        this.name.setValue(this.employee.name);
        this.cpf.setValue(this.employee.cpf);
        this.email.setValue(this.employee.email);
        this.password.setValue(this.employee.password);
      },
      error: (ex) => {
        console.error('Erro ao buscar funcionário:', ex);
      }
    });
  }

  update(): void {
    this.service.update(this.employee).subscribe({
      next: () => {
        this.route.navigate(['employees']);
      },
      error: (ex) => {
        console.error('Erro ao atualizar funcionário:', ex);
      }
    });
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
