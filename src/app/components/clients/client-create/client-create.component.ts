import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { 
  FormBuilder, FormControl, 
  FormGroup, FormsModule, 
  ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/modelClient';
import { ClientsService } from 'src/app/services/clients.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-client-create',
  imports: [
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './client-create.component.html',
  styleUrl: './client-create.component.css'
})
export class ClientCreateComponent implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly service = inject(ClientsService);
  private readonly route = inject(Router);
  private readonly toast = inject(ToastService);

  clientForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.clientForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cpf: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      profile: new FormControl(['CLIENTE'])
    });
  }

  create(): void {
    if (this.clientForm.valid) {
      const client: Client = this.clientForm.value;
      this.service.create(client)
        .subscribe({
          next: () => {
            this.toast.success('Cliente cadastrado com sucesso!');
            this.route.navigate(['/clients']);
          },
          error: (ex) => {
            console.error(ex);
            const msg = ex.error?.message || 'Erro ao cadastrar cliente!';
            this.toast.error(msg);
          }
        });
    }
  }

  addPerfil(profile: any): void {
    const currentProfiles = this.clientForm.get('profile')?.value || [];
    if (currentProfiles.includes(profile)) {
      this.clientForm.patchValue({
        profile: currentProfiles.filter((p: any) => p !== profile)
      });
    } else {
      this.clientForm.patchValue({
        profile: [...currentProfiles, profile]
      });
    }
  }

  validation(): boolean {
    return this.clientForm.valid;
  }
}