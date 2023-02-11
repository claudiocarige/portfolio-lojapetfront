import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/modelClient';
import { ClientsService } from 'src/app/services/clients.service';


@Component({
  selector: 'app-client-delete',
  templateUrl: './client-delete.component.html',
  styleUrls: ['./client-delete.component.css']
})
export class ClientDeleteComponent implements OnInit {
  client: Client = {
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
    private service:      ClientsService,
    private toast:        ToastrService,
    private route:        Router,
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
  delete(): void {
    this.service.delete(this.client.id).subscribe(() => {
      this.toast.success('Funcionário deletado com sucesso!', 'D E L E T A R - F U N C I O N Á R I O');
      this.route.navigate(['clients'])
    }, ex => {
      console.log(ex.error.errors);
      if (ex.error.errors) {
        ex.error.errors.array.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

  addCheck(): boolean{
   return this.client.name === this.check
  }
  validation(): boolean{
    return this.client.name === this.check
  }
}