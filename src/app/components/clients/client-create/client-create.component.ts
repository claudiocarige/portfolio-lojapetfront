import { Component, OnInit        } from '@angular/core';
import { UntypedFormControl, Validators  } from '@angular/forms';
import { Router                   } from '@angular/router';
import { ToastrService            } from 'ngx-toastr';
import { Client                   } from 'src/app/models/modelClient';
import { ClientsService           } from 'src/app/services/clients.service';

@Component({
  selector:    'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls:  ['./client-create.component.css']
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
  name:     UntypedFormControl = new UntypedFormControl(null,                         Validators.minLength(3));
  cpf:      UntypedFormControl = new UntypedFormControl(null, [Validators.required, Validators.minLength(11)]);
  email:    UntypedFormControl = new UntypedFormControl(null,                                Validators.email);
  password: UntypedFormControl = new UntypedFormControl(null,                         Validators.minLength(6));

  constructor(
    private service: ClientsService,
    private toast:    ToastrService,
    private route:           Router
  ) { }

  ngOnInit(): void {
  }
  create(): void {
    this.service.create(this.client).subscribe(() => {
      this.toast.success('Cliente criado com sucesso!', 'C A D A S T R O')
      this.route.navigate(['clients']);
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
    if (this.client.profile.includes(profile)) {
      this.client.profile.splice(this.client.profile.indexOf(profile), 1);
    } else {
      this.client.profile.push(profile);
    }
  }
  validation(): boolean {
    return this.name.valid && 
           this.cpf.valid && 
           this.email.valid && 
           this.password.valid;
  }
}
