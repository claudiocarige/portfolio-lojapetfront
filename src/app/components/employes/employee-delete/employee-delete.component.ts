import { Component, OnInit      } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService          } from 'ngx-toastr';
import { Employee               } from 'src/app/models/modelEmployee';
import { EmployeesService       } from 'src/app/services/employees.service';

@Component({
  selector:    'app-employee-delete',
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
    private toast:           ToastrService,
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
      this.toast.success('Funcionário deletado com sucesso!', 'D E L E Ç Ã O');
      this.route.navigate(['employees'])
    }, ex => {
      console.log(ex.error.errors);
      if (ex.error.errors) {
        ex.error.errors.array.forEach(element => {
          this.toast.error(element.message, "A T E N Ç Ã O !", {timeOut: 5000});
        });
      } else {
        this.toast.error(ex.error.message, "A T E N Ç Ã O !", {timeOut: 5000});
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
