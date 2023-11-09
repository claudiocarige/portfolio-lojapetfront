import { Component, OnInit        } from '@angular/core';
import { UntypedFormControl, Validators  } from '@angular/forms';
import { ActivatedRoute, Router   } from '@angular/router';
import { ToastrService            } from 'ngx-toastr';
import { Employee                 } from 'src/app/models/modelEmployee';
import { EmployeesService         } from 'src/app/services/employees.service';

@Component({
  selector:    'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls:  ['./employee-update.component.css']
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
    private toast:        ToastrService,
    private route:        Router,
    private activeRoute:  ActivatedRoute
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
  update(): void {
    this.service.update(this.employee).subscribe(() => {
      this.toast.success('Funcionário atualizado com sucesso!', 'A T U A L I Z A Ç Ã O');
      this.route.navigate(['employees'])
    }, ex => {
      console.log(ex.error.errors);
      if (ex.error.errors) {
        ex.error.errors.array.forEach(element => {
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
