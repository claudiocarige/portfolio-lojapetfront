import { Component, OnInit        } from '@angular/core';
import { UntypedFormControl, Validators  } from '@angular/forms';
import { Router, ActivatedRoute   } from '@angular/router';
import { ToastrService            } from 'ngx-toastr';
import { Client                   } from 'src/app/models/modelClient';
import { ClientsService           } from 'src/app/services/clients.service';


@Component({
  selector:    'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls:  ['./client-update.component.css']
})
export class ClientUpdateComponent implements OnInit {
  client: Client = {
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
    private service:      ClientsService,
    private toast:         ToastrService,
    private route:                Router,
    private activeRoute:  ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.client.id = this.activeRoute.snapshot.paramMap.get('id');
    this.findById();
  }

  findById() {
    this.service.findById(this.client.id).subscribe(resposta => {
      resposta.profile = [];
      this.client = resposta;
    })
  }
  update(): void {
    this.service.update(this.client).subscribe(() => {
      this.toast.success('Cliente atualizado com sucesso!', 'A T U A L I Z A Ç Ã O');
      this.route.navigate(['clients'])
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

