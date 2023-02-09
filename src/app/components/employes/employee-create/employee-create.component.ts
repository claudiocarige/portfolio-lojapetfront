import { Component, OnInit        } from '@angular/core';
import { FormControl, Validators  } from '@angular/forms';
import { Router                   } from '@angular/router';
import { ToastrService            } from 'ngx-toastr';
import { Employee                 } from 'src/app/models/dataEmployee';
import { EmployeesService         } from 'src/app/services/employees.service';

@Component({
  selector:    'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls:  ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  employee: Employee = {
    id:           '',
    name:         '',
    cpf:          '',
    email:        '',
    password:     '',
    profile:      [],
    criationDate: ''
  }
  name:     FormControl = new FormControl(null, Validators.minLength(3));
  cpf:      FormControl = new FormControl(null,[Validators.required, Validators.minLength(11)]);
  email:    FormControl = new FormControl(null,        Validators.email);
  password: FormControl = new FormControl(null, Validators.minLength(6));

  constructor(
    private service: EmployeesService,
    private toast: ToastrService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }
  create(): void {
    this.service.create(this.employee).subscribe(() => {
      this.toast.success('Funcionário criado com sucesso!', 'Cadastro')
      this.route.navigate(['employees']);
    }, ex => {
      console.log(ex);
      if (ex.error.erros) {
        ex.error.erros.array.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
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
