import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  imports: [
    CommonModule,
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
  form = this.fb.group({
    tipo: ['PJ', Validators.required],
    nomeEmpresa: [''],
    nomeCompleto: [''],
    cpfCnpj: ['', [Validators.required]],
    endereco: ['', Validators.required],
    nomeResponsavel: ['', Validators.required],
    contato: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    public router: Router
  ) {
    // Validadores condicionais para PF/PJ
    this.form.get('tipo')?.valueChanges.subscribe((v) => this.adjustValidators(String(v)));
    // Aplica validadores iniciais
    this.adjustValidators(String(this.form.get('tipo')?.value));
  }

  tipoEhPF(): boolean {
    return this.form.get('tipo')?.value === 'PF';
  }

  private valueAsString(controlName: string): string {
    const v = this.form.get(controlName)?.value;
    return v == null ? '' : String(v);
  }

  private adjustValidators(tipo: string): void {
    const nomeEmpresa = this.form.get('nomeEmpresa');
    const nomeCompleto = this.form.get('nomeCompleto');

    if (tipo === 'PF') {
      nomeEmpresa?.clearValidators();
      nomeEmpresa?.updateValueAndValidity();

      nomeCompleto?.setValidators([Validators.required]);
      nomeCompleto?.updateValueAndValidity();
    } else {
      nomeCompleto?.clearValidators();
      nomeCompleto?.updateValueAndValidity();

      nomeEmpresa?.setValidators([Validators.required]);
      nomeEmpresa?.updateValueAndValidity();
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const tipo = this.form.get('tipo')?.value;

    try {
      if (tipo === 'PF') {
        const payload = {
          tipo: 'PF' as const,
          nomeCompleto: this.valueAsString('nomeCompleto'),
          cpf: this.valueAsString('cpfCnpj'),
          endereco: this.valueAsString('endereco'),
          nomeResponsavel: this.valueAsString('nomeResponsavel'),
          contato: this.valueAsString('contato'),
          ativo: true
        };

        this.clienteService.criarCliente(payload);
      } else {
        const payload = {
          tipo: 'PJ' as const,
          nomeEmpresa: this.valueAsString('nomeEmpresa'),
          cnpj: this.valueAsString('cpfCnpj'),
          endereco: this.valueAsString('endereco'),
          nomeResponsavel: this.valueAsString('nomeResponsavel'),
          contato: this.valueAsString('contato'),
          ativo: true
        };

        this.clienteService.criarCliente(payload);
      }

      this.snackBar.open('Cliente criado com sucesso!', 'Fechar', { duration: 3000 });
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.snackBar.open('Erro ao criar cliente: ' + (error?.message || String(error)), 'Fechar', { duration: 5000 });
    }
  }
}
