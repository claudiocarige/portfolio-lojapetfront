import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
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
import { Subject, Observable, of } from 'rxjs';
import { distinctUntilChanged, takeUntil, map, catchError, tap } from 'rxjs/operators';

@Component({
    selector: 'app-create-chamado',
    standalone: true,
    imports: [CommonModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterModule, MatSelectModule, MatCardModule, MatSnackBarModule],
    templateUrl: './create-chamado.component.html',
    styleUrls: ['./create-chamado.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateChamadoComponent implements OnInit, OnDestroy {

  private readonly CONTEXT = 'CreateChamadoComponent';
  empresas: ClientePJ[] = [];
  isSubmitting = false;
  private destroy$ = new Subject<void>();
  empresas$!: Observable<ClientePJ[]>;

      form = this.fb.group({
    empresaId: ['', Validators.required],
    responsavel: ['', Validators.required],
      contato: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]], // Exemplo: 10 ou 11 dígitos para telefone
    endereco: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.minLength(30)]]
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

    // Expor empresas como Observable para uso com async pipe
    this.empresas$ = this.clienteService.getEmpresas().pipe(
      map(clientes => clientes.filter(c => {
        const t = (c as any).tipo;
        return t != null && String(t).toUpperCase() === 'PJ';
      }) as ClientePJ[]),
      tap(arr => this.logger.info(this.CONTEXT, 'Empresas PJ filtradas', { total: arr.length })),
      map(arr => (arr && arr.length > 0) ? arr : MOCK_EMPRESAS.slice()),
      catchError(err => {
        this.logger.error(this.CONTEXT, 'Erro ao carregar empresas via ClienteService', { erro: String(err) });
        return of(MOCK_EMPRESAS.slice());
      })
    );

    // Manter cópia local para buscas síncronas/patchValue
    this.empresas$.pipe(takeUntil(this.destroy$)).subscribe(arr => this.empresas = arr);

    // Quando a empresa mudar, preencher campos (unsubscribe controlado por takeUntil)
    this.form
      .get('empresaId')
      ?.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(id => this.onEmpresaChange(String(id)));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onEmpresaChange(id: string): void {
    // Tentar obter cliente do serviço; se não existir (mock), buscar no array local
    let cliente = this.clienteService.obterClientePorId(id);
    if (!cliente) {
      cliente = this.empresas.find(e => e.id === id) as ClientePJ | undefined;
    }

    if (cliente) {
      this.form.patchValue({
        empresaId: cliente.id,
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

  async submit(): Promise<void> {
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

    try {
      this.isSubmitting = true;
      const criado = await this.chamadoService.criarChamado(payload);
      this.snackBar.open(`Chamado criado com sucesso (ID: ${criado.id})`, 'Fechar', { duration: 4000 });
      this.router.navigate(['/home']);
    } catch (err) {
      this.snackBar.open('Erro ao criar chamado', 'Fechar', { duration: 3000 });
    } finally {
      this.isSubmitting = false;
    }
  }

}
