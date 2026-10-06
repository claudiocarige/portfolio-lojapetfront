import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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
  selector: 'app-client-update',
  imports: [RouterModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './client-update.component.html',
  styleUrl: './client-update.component.css'
})
export class ClientUpdateComponent implements OnInit {

  private readonly service = inject(ClientsService);
  private readonly route = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  client: Client = {
    id:           '',
    name:         '',
    cpf:          '',
    email:        '',
    password:     '',
    profile:      [],
    criationDate: ''
  };

  readonly name = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] });
  readonly cpf = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(11), Validators.maxLength(11)] });
  readonly email = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] });
  readonly password = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(4)] });

  ngOnInit(): void {
    this.client.id = this.activeRoute.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.client.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resposta) => {
          this.client = {
            ...resposta,
            profile: resposta.profile || ['CLIENTE']
          };
          this.name.setValue(this.client.name || '');
          this.cpf.setValue(this.client.cpf || '');
          this.email.setValue(this.client.email || '');
          this.password.setValue(this.client.password || '');
        },
        error: (ex) => {
          console.error('Erro ao buscar cliente:', ex);
        }
      });
  }

  update(): void {
    if (!this.validation()) {
      return;
    }

    const updatedClient: Client = {
      ...this.client,
      name: this.name.value,
      cpf: this.cpf.value,
      email: this.email.value,
      password: this.password.value
    };

    this.service.update(updatedClient)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.route.navigate(['clients']);
        },
        error: (ex) => {
          console.error('Erro ao atualizar cliente:', ex);
        }
      });
  }

  addPerfil(profile: any): void {
    if (this.client.profile.includes(profile)) {
      this.client.profile = this.client.profile.filter(p => p !== profile);
    } else {
      this.client.profile = [...this.client.profile, profile];
    }
  }

  validation(): boolean {
    return this.name.valid && 
           this.cpf.valid && 
           this.email.valid && 
           this.password.valid;
  }
}

