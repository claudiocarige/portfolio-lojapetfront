import { Component, OnInit        } from '@angular/core';
import { UntypedFormControl, Validators  } from '@angular/forms';
import { Router                   } from '@angular/router';
import { ToastrService            } from 'ngx-toastr';
import { Employee                 } from 'src/app/models/modelEmployee';
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
  name:     UntypedFormControl = new UntypedFormControl(null, Validators.minLength(3));
  cpf:      UntypedFormControl = new UntypedFormControl(null,[Validators.required, Validators.minLength(11)]);
  email:    UntypedFormControl = new UntypedFormControl(null,        Validators.email);
  password: UntypedFormControl = new UntypedFormControl(null, Validators.minLength(6));

  constructor(
    private service: EmployeesService,
    private toast:      ToastrService,
    private route:             Router
  ) { }

  ngOnInit(): void {
  }
  create(): void {
    this.service.create(this.employee).subscribe(() => {
      this.toast.success('Funcionário criado com sucesso!', 'C A D A S T R O')
      this.route.navigate(['employees']);
    }, ex => {
      console.log(ex);
      if (ex.error.erros) {
        ex.error.erros.array.forEach(element => {
          this.toast.error(element.message, "A T E N Ç Ã O !");
        });
      } else {
        this.toast.error(ex.error.message, "A T E N Ç Ã O !");
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
