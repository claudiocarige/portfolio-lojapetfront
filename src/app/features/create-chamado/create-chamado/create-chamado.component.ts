import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { LoggerService } from '../../../core/services/logger.service';
import { ClienteService } from '../../../core/services/cliente.service';
import { Cliente, ClientePJ } from '../../../core/models/cliente.model';
import { MOCK_EMPRESAS } from '../../../core/mocks/empresas.mock';
import { ChamadoService } from '../../../core/services/chamado.service';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector: 'app-create-chamado',
    standalone: true,
    imports: [CommonModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterModule, MatSelectModule, MatCardModule, MatSnackBarModule],
    templateUrl: './create-chamado.component.html',
    styleUrl: './create-chamado.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateChamadoComponent implements OnInit {

  private readonly CONTEXT = 'CreateChamadoComponent';
  empresas: ClientePJ[] = [];

      form = this.fb.group({
    empresaId: ['', Validators.required],
    responsavel: ['', Validators.required],
    contato: ['', Validators.required, Validators.pattern(/^\d{10,11}$/)], // Exemplo: 10 ou 11 dígitos para telefone
    endereco: ['', Validators.required],
    description: ['', Validators.required, Validators.minLength(30)]
  });

  constructor(
    private logger: LoggerService,
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private chamadoService: ChamadoService,
    private snackBar: MatSnackBar,
    public router: Router
  ) {
    this.logger.info(this.CONTEXT, 'Componente criado');
  }

  ngOnInit(): void {
    this.logger.info(this.CONTEXT, 'Inicializando formulário');
    // Carregar empresas (clientes PJ)
    const todos = this.clienteService.obterClientes();
    this.empresas = (todos.filter(c => (c as any).tipo === 'PJ')) as ClientePJ[];

    // Se não houver empresas reais cadastradas, usar mock para desenvolvimento
    if (!this.empresas || this.empresas.length === 0) {
      this.empresas = MOCK_EMPRESAS.slice();
    }

    // Quando a empresa mudar, preencher campos
    this.form.get('empresaId')?.valueChanges.subscribe(id => this.onEmpresaChange(String(id)));
  }

  onEmpresaChange(id: string): void {
    // Tentar obter cliente do serviço; se não existir (mock), buscar no array local
    let cliente = this.clienteService.obterClientePorId(id);
    if (!cliente) {
      cliente = this.empresas.find(e => e.id === id) as ClientePJ | undefined;
    }

    if (cliente) {
      this.form.patchValue({
        responsavel: cliente.nomeResponsavel,
        contato: (cliente as any).contato,
        endereco: cliente.endereco
      });
    }
  }

  private valueAsString(controlName: string): string {
    const v = this.form.get(controlName)?.value;
    return v == null ? '' : String(v);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      responsavel: this.valueAsString('responsavel'),
      contato: this.valueAsString('contato'),
      endereco: this.valueAsString('endereco'),
      description: this.valueAsString('description')
    };

    this.chamadoService.criarChamado(payload);
    this.snackBar.open('Chamado criado com sucesso!', 'Fechar', { duration: 3000 });
    this.router.navigate(['/home']);
  }

}
