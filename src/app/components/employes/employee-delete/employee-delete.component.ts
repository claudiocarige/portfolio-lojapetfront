import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Employee } from 'src/app/models/modelEmployee';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employee-delete',
  imports: [RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatCheckboxModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employee-delete.component.html',
  styleUrl: './employee-delete.component.css'
})
export class EmployeeDeleteComponent implements OnInit {

  private readonly service = inject(EmployeesService);
  private readonly route = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  employee: Employee = {
    id:           '',
    name:         '',
    cpf:          '',
    email:        '',
    password:     '',
    profile:      [],
    criationDate: ''
  }

  check: string;
  ngOnInit(): void {
    this.employee.id = this.activeRoute.snapshot.paramMap.get('id');
    this.findById();
  }

  findById() {
    this.service.findById(this.employee.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resposta) => {
          resposta.profile = [];
          this.employee = resposta;
        },
        error: (ex) => {
          console.error('Erro ao buscar funcionário:', ex);
        }
      });
  }

  delete(): void {
    this.service.delete(this.employee.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.route.navigate(['employees']);
        },
        error: (ex) => {
          console.error('Erro ao deletar funcionário:', ex);
        }
      });
  }

  addCheck(): boolean{
   return this.employee.name === this.check
  }
  validation(): boolean{
    return this.employee.name === this.check
  }
}
