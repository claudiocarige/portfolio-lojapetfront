import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CreateClienteComponent } from './create-cliente.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';

describe('CreateClienteComponent', () => {
  let component: CreateClienteComponent;
  let fixture: ComponentFixture<CreateClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreateClienteComponent,
        RouterTestingModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCardModule,
        MatSnackBarModule
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o form com tipo PJ', () => {
    expect(component.form.get('tipo')?.value).toBe('PJ');
    expect(component.form.invalid).toBeTrue();
  });

  it('deve exibir erros de validação ao submeter form vazio', () => {
    spyOn(component.form, 'markAllAsTouched');
    component.submit();
    expect(component.form.markAllAsTouched).toHaveBeenCalled();
    expect(component.isSubmitting()).toBeFalse();
  });

  it('deve construir payload corretamente para PF', () => {
    component.form.patchValue({
      tipo: 'PF',
      nomeCliente: 'João',
      cpfCnpj: '12345678900',
      endereco: 'Rua A',
      nomeResponsavel: 'João',
      contato: '11999999999'
    });
    
    const criarClienteSpy = spyOn((component as any).clienteService, 'criarCliente').and.returnValue(of({}));
    component.submit();
    
    expect(criarClienteSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      tipo: 'PF',
      nomeCliente: 'João',
      cpf: '12345678900'
    }));
  });

  it('deve construir payload corretamente para PJ', () => {
    component.form.patchValue({
      tipo: 'PJ',
      nomeCliente: 'Empresa',
      cpfCnpj: '123456789000123',
      endereco: 'Rua B',
      nomeResponsavel: 'Maria',
      contato: '11888888888'
    });
    
    const criarClienteSpy = spyOn((component as any).clienteService, 'criarCliente').and.returnValue(of({}));
    component.submit();
    
    expect(criarClienteSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      tipo: 'PJ',
      nomeCliente: 'Empresa',
      cnpj: '123456789000123'
    }));
  });

  it('deve submeter com sucesso, mostrar toast e redirecionar', () => {
    component.form.patchValue({
      tipo: 'PJ',
      nomeCliente: 'Empresa',
      cpfCnpj: '123',
      endereco: 'Rua',
      nomeResponsavel: 'Resp',
      contato: '123'
    });

    const criarClienteSpy = spyOn((component as any).clienteService, 'criarCliente').and.returnValue(of({}));
    const snackBarSpy = spyOn((component as any).snackBar, 'open');
    const routerSpy = spyOn(component.router, 'navigate');

    component.submit();

    expect(criarClienteSpy).toHaveBeenCalled();
    expect(snackBarSpy).toHaveBeenCalledWith('Cliente criado com sucesso!', 'Fechar', { duration: 3000 });
    expect(routerSpy).toHaveBeenCalledWith(['/home']);
  });

  it('deve exibir toast de erro se a criação falhar e resetar isSubmitting', () => {
    component.form.patchValue({
      tipo: 'PJ',
      nomeCliente: 'Empresa',
      cpfCnpj: '123',
      endereco: 'Rua',
      nomeResponsavel: 'Resp',
      contato: '123'
    });

    const criarClienteSpy = spyOn((component as any).clienteService, 'criarCliente').and.returnValue(throwError(() => new Error('Erro API')));
    const snackBarSpy = spyOn((component as any).snackBar, 'open');

    component.submit();

    expect(criarClienteSpy).toHaveBeenCalled();
    expect(snackBarSpy).toHaveBeenCalledWith('Erro ao criar cliente: Erro API', 'Fechar', { duration: 5000 });
    expect(component.isSubmitting()).toBeFalse();
  });
});
