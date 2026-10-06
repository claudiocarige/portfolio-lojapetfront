import { Component, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/modelEmployee';
import { EmployeesService } from 'src/app/services/employees.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-employee-create',
  imports: [RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.css'
})
export class EmployeeCreateComponent {

  private readonly service = inject(EmployeesService);
  private readonly route = inject(Router);
  private readonly toast = inject(ToastService);

  employee: Employee = {
    id:           '',
    name:         '',
    cpf:          '',
    email:        '',
    password:     '',
    profile:      ['TECNICO'],
    criationDate: ''
  };

  readonly name = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] });
  readonly cpf = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(11)] });
  readonly email = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] });
  readonly password = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] });

  create(): void {
    if (!this.validation()) {
      return;
    }

    const newEmployee: Employee = {
      ...this.employee,
      name: this.name.value,
      cpf: this.cpf.value,
      email: this.email.value,
      password: this.password.value
    };

    this.service.create(newEmployee).subscribe({
      next: () => {
        this.toast.success('Funcionário cadastrado com sucesso!');
        this.route.navigate(['/employees']);
      },
      error: (ex) => {
        console.error('Erro ao cadastrar funcionário:', ex);
        const msg = ex.error?.message || 'Erro ao cadastrar funcionário!';
        this.toast.error(msg);
      }
    });
  }

  addPerfil(profile: any): void {
    if (this.employee.profile.includes(profile)) {
      this.employee.profile = this.employee.profile.filter(p => p !== profile);
    } else {
      this.employee.profile = [...this.employee.profile, profile];
    }
  }

  validation(): boolean {
    return this.name.valid && this.cpf.valid && this.email.valid && this.password.valid;
  }
}
