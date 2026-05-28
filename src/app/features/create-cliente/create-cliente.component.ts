import { Component, ChangeDetectionStrategy, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ClienteService } from '../../core/services/cliente.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-cliente',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.scss']
})
export class CreateClienteComponent {

  private readonly fb             = inject(FormBuilder);
  private readonly clienteService = inject(ClienteService);
  private readonly snackBar       = inject(MatSnackBar);
  private readonly destroyRef     = inject(DestroyRef);
  readonly router                 = inject(Router);

  readonly isSubmitting = signal(false);

  readonly form = this.fb.group({
    tipo:            ['PJ', Validators.required],
    nomeCliente:     ['', Validators.required],
    cpfCnpj:         ['', Validators.required],
    endereco:        ['', Validators.required],
    nomeResponsavel: ['', Validators.required],
    contato:         ['', Validators.required]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    this.clienteService.criarCliente(this.buildPayload())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.snackBar.open('Cliente criado com sucesso!', 'Fechar', { duration: 3000 });
          this.router.navigate(['/home']);
        },
        error: (err: Error) => {
          this.snackBar.open('Erro ao criar cliente: ' + err.message, 'Fechar', { duration: 5000 });
          this.isSubmitting.set(false);
        }
      });
  }

  // ============ MÉTODOS PRIVADOS ============

  private buildPayload() {
    const tipo = this.valueAsString('tipo') as 'PF' | 'PJ';
    const base = {
      tipo,
      nomeCliente:     this.valueAsString('nomeCliente'),
      endereco:        this.valueAsString('endereco'),
      nomeResponsavel: this.valueAsString('nomeResponsavel'),
      contato:         this.valueAsString('contato'),
      ativo:           true
    };

    if (tipo === 'PF') {
      return { ...base, tipo: 'PF' as const, cpf: this.valueAsString('cpfCnpj') };
    }
    return { ...base, tipo: 'PJ' as const, cnpj: this.valueAsString('cpfCnpj') };
  }

  private valueAsString(controlName: string): string {
    const v = this.form.get(controlName)?.value;
    return v == null ? '' : String(v);
  }
}
