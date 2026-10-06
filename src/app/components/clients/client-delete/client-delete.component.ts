import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Client } from 'src/app/models/modelClient';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-client-delete',
  imports: [RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatCheckboxModule, FormsModule, ReactiveFormsModule],
  templateUrl: './client-delete.component.html',
  styleUrl: './client-delete.component.css'
})
export class ClientDeleteComponent implements OnInit {

  private readonly service = inject(ClientsService);
  private readonly route = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);

  client: Client = {
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
    this.client.id = this.activeRoute.snapshot.paramMap.get('id');
    this.findById();
  }

  findById() {
    this.service.findById(this.client.id).subscribe({
      next: (resposta) => {
        resposta.profile = [];
        this.client = resposta;
      },
      error: (ex) => {
        console.error('Erro ao buscar cliente:', ex);
      }
    });
  }

  delete(): void {
    this.service.delete(this.client.id).subscribe({
      next: () => {
        this.route.navigate(['clients']);
      },
      error: (ex) => {
        console.error('Erro ao deletar cliente:', ex);
      }
    });
  }

  addCheck(): boolean{
   return this.client.name === this.check
  }
  validation(): boolean{
    return this.client.name === this.check
  }
}