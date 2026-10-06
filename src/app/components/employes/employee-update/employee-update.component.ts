import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Employee } from 'src/app/models/modelEmployee';
import { EmployeesService } from 'src/app/services/employees.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-employee-update',
  imports: [RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './employee-update.component.html',
  styleUrl: './employee-update.component.css'
})
export class EmployeeUpdateComponent implements OnInit {

  private readonly service = inject(EmployeesService);
  private readonly route = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toast = inject(ToastService);

  employee: Employee = {
    id:           '',
    name:         '',
    cpf:          '',
    email:        '',
    password:     '',
    profile:      [],
    criationDate: ''
  };

  readonly name = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] });
  readonly cpf = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(11)] });
  readonly email = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] });
  readonly password = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(4)] });

  ngOnInit(): void {
    this.employee.id = this.activeRoute.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.employee.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resposta) => {
          this.employee = {
            ...resposta,
            profile: resposta.profile || ['TECNICO']
          };
          this.name.setValue(this.employee.name || '');
          this.cpf.setValue(this.employee.cpf || '');
          this.email.setValue(this.employee.email || '');
          this.password.setValue(this.employee.password || '');
        },
        error: (ex) => {
          console.error('Erro ao buscar funcionário:', ex);
          this.toast.error('Erro ao carregar dados do funcionário!');
        }
      });
  }

  update(): void {
    if (!this.validation()) {
      return;
    }

    const updatedEmployee: Employee = {
      ...this.employee,
      name: this.name.value,
      cpf: this.cpf.value,
      email: this.email.value,
      password: this.password.value
    };

    this.service.update(updatedEmployee)
      .subscribe({
        next: () => {
          this.toast.success('Funcionário atualizado com sucesso!');
          this.route.navigate(['/employees']);
        },
        error: (ex) => {
          console.error('Erro ao atualizar funcionário:', ex);
          const msg = ex.error?.message || 'Erro ao atualizar funcionário!';
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
