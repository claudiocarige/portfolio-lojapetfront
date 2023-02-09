import { Component, OnInit        } from '@angular/core';
import { FormControl, Validators  } from '@angular/forms';
import { Router                   } from '@angular/router';
import { ToastrService            } from 'ngx-toastr';
import { Client                   } from 'src/app/models/modelClient';
import { ClientsService           } from 'src/app/services/clients.service';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit {

  client: Client = {
    id:           '',
    name:         '',
    cpf:          '',
    email:        '',
    password:     '',
    profile:      [],
    criationDate: ''
  }
  name:     FormControl = new FormControl(null,                         Validators.minLength(3));
  cpf:      FormControl = new FormControl(null, [Validators.required, Validators.minLength(11)]);
  email:    FormControl = new FormControl(null,                                Validators.email);
  password: FormControl = new FormControl(null,                         Validators.minLength(6));

  constructor(
    private service: ClientsService,
    private toast: ToastrService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }
  create(): void {
    this.service.create(this.client).subscribe(() => {
      this.toast.success('Cliente criado com sucesso!', 'Cadastro')
      this.route.navigate(['clients']);
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
    if (this.client.profile.includes(profile)) {
      this.client.profile.splice(this.client.profile.indexOf(profile), 1);
    } else {
      this.client.profile.push(profile);
    }
  }
  validation(): boolean {
    return this.name.valid && this.cpf.valid && this.email.valid && this.password.valid;
  }
}
