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
    nomeCliente: ['', Validators.required],
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
    // Pode adicionar validadores condicionais para CPF/CNPJ aqui se necessário
  }

  tipoEhPF(): boolean {
    return this.form.get('tipo')?.value === 'PF';
  }

  private valueAsString(controlName: string): string {
    const v = this.form.get(controlName)?.value;
    return v == null ? '' : String(v);
  }

  private adjustValidators(tipo: string): void {
    // Not needed: unified `nomeCliente` field used for PF and PJ
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const tipo = this.form.get('tipo')?.value;

    try {
      const payloadBase = {
        tipo: tipo as 'PF' | 'PJ',
        nomeCliente: this.valueAsString('nomeCliente'),
        endereco: this.valueAsString('endereco'),
        nomeResponsavel: this.valueAsString('nomeResponsavel'),
        contato: this.valueAsString('contato'),
        ativo: true
      };

      if (tipo === 'PF') {
        const payload = {
          ...payloadBase,
          cpf: this.valueAsString('cpfCnpj')
        } as any;
        this.clienteService.criarCliente(payload);
      } else {
        const payload = {
          ...payloadBase,
          cnpj: this.valueAsString('cpfCnpj')
        } as any;
        this.clienteService.criarCliente(payload);
      }

      this.snackBar.open('Cliente criado com sucesso!', 'Fechar', { duration: 3000 });
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.snackBar.open('Erro ao criar cliente: ' + (error?.message || String(error)), 'Fechar', { duration: 5000 });
    }
  }
}
