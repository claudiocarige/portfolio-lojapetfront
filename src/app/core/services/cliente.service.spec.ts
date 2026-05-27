import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ClienteService } from './cliente.service';
import { LoggerService } from './logger.service';
import { API_BASE_URL } from '../config';
import { ClientePF, ClientePJ } from '../models/cliente.model';

describe('ClienteService', () => {
  let service: ClienteService;
  let loggerService: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ClienteService,
        LoggerService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: '' } // fallback local nos testes unitários
      ]
    });

    service = TestBed.inject(ClienteService);
    loggerService = TestBed.inject(LoggerService);

    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  // ============ CRIAR CLIENTES ============

  it('deve criar cliente pessoa física (PF) válido', (done) => {
    const clientePF: Omit<ClientePF, 'id' | 'dataCriacao'> = {
      tipo: 'PF',
      nomeCliente: 'João Silva',
      cpf: '123.456.789-10',
      endereco: 'Rua A, 123',
      contato: 'joao@email.com',
      nomeResponsavel: 'João Silva',
      ativo: true
    };

    service.criarCliente(clientePF).subscribe({
      next: (resultado) => {
        expect(resultado).toBeTruthy();
        expect(resultado.id).toBeDefined();
        expect(resultado.tipo).toBe('PF');
        expect(resultado.dataCriacao).toBeDefined();
        done();
      },
      error: done.fail
    });
  });

  it('deve criar cliente pessoa jurídica (PJ) válido', (done) => {
    const clientePJ: Omit<ClientePJ, 'id' | 'dataCriacao'> = {
      tipo: 'PJ',
      nomeCliente: 'Tech Solutions LTDA',
      cnpj: '12.345.678/0001-90',
      endereco: 'Av. B, 456',
      contato: 'contato@techsolutions.com',
      nomeResponsavel: 'Carlos Santos',
      ativo: true
    };

    service.criarCliente(clientePJ).subscribe({
      next: (resultado) => {
        expect(resultado).toBeTruthy();
        expect(resultado.id).toBeDefined();
        expect(resultado.tipo).toBe('PJ');
        done();
      },
      error: done.fail
    });
  });

  it('deve emitir erro ao criar cliente PF com CPF inválido', (done) => {
    const clientePF: Omit<ClientePF, 'id' | 'dataCriacao'> = {
      tipo: 'PF',
      nomeCliente: 'João Silva',
      cpf: '000.000.000-00',
      endereco: 'Rua A, 123',
      contato: 'joao@email.com',
      nomeResponsavel: 'João Silva',
      ativo: true
    };

    service.criarCliente(clientePF).subscribe({
      next: () => done.fail('Deveria ter falhado'),
      error: (err) => {
        expect(err).toBeTruthy();
        done();
      }
    });
  });

  it('deve emitir erro ao criar cliente PJ com CNPJ inválido', (done) => {
    const clientePJ: Omit<ClientePJ, 'id' | 'dataCriacao'> = {
      tipo: 'PJ',
      nomeCliente: 'Tech Solutions LTDA',
      cnpj: '00.000.000/0000-00',
      endereco: 'Av. B, 456',
      contato: 'contato@techsolutions.com',
      nomeResponsavel: 'Carlos Santos',
      ativo: true
    };

    service.criarCliente(clientePJ).subscribe({
      next: () => done.fail('Deveria ter falhado'),
      error: (err) => {
        expect(err).toBeTruthy();
        done();
      }
    });
  });

  // ============ OBTER CLIENTES ============

  it('deve obter lista de clientes', (done) => {
    const clientePF: Omit<ClientePF, 'id' | 'dataCriacao'> = {
      tipo: 'PF',
      nomeCliente: 'João Silva',
      cpf: '123.456.789-10',
      endereco: 'Rua A, 123',
      contato: 'joao@email.com',
      nomeResponsavel: 'João Silva',
      ativo: true
    };

    service.criarCliente(clientePF).subscribe(() => {
      const clientes = service.obterClientes();
      expect(clientes).toBeTruthy();
      expect(clientes.length).toBe(1);
      done();
    });
  });

  it('deve retornar lista vazia quando não há clientes', () => {
    const clientes = service.obterClientes();
    expect(clientes).toEqual([]);
  });

  // ============ OBTER POR ID ============

  it('deve obter cliente por ID', (done) => {
    const clientePF: Omit<ClientePF, 'id' | 'dataCriacao'> = {
      tipo: 'PF',
      nomeCliente: 'João Silva',
      cpf: '123.456.789-10',
      endereco: 'Rua A, 123',
      contato: 'joao@email.com',
      nomeResponsavel: 'João Silva',
      ativo: true
    };

    service.criarCliente(clientePF).subscribe((criado) => {
      const encontrado = service.obterClientePorId(criado.id);
      expect(encontrado).toEqual(criado);
      done();
    });
  });

  it('deve retornar undefined para cliente não encontrado', () => {
    const encontrado = service.obterClientePorId('id_inexistente');
    expect(encontrado).toBeUndefined();
  });

  // ============ ATUALIZAR ============

  it('deve atualizar cliente existente', (done) => {
    const clientePF: Omit<ClientePF, 'id' | 'dataCriacao'> = {
      tipo: 'PF',
      nomeCliente: 'João Silva',
      cpf: '123.456.789-10',
      endereco: 'Rua A, 123',
      contato: 'joao@email.com',
      nomeResponsavel: 'João Silva',
      ativo: true
    };

    service.criarCliente(clientePF).subscribe((criado) => {
      const atualizado = service.atualizarCliente(criado.id, {
        endereco: 'Rua Nova, 999'
      });
      expect(atualizado.endereco).toBe('Rua Nova, 999');
      done();
    });
  });

  it('deve lançar erro ao atualizar cliente inexistente', () => {
    expect(() =>
      service.atualizarCliente('id_inexistente', { ativo: false })
    ).toThrowError();
  });

  // ============ DELETAR ============

  it('deve deletar cliente por ID', (done) => {
    const clientePF: Omit<ClientePF, 'id' | 'dataCriacao'> = {
      tipo: 'PF',
      nomeCliente: 'João Silva',
      cpf: '123.456.789-10',
      endereco: 'Rua A, 123',
      contato: 'joao@email.com',
      nomeResponsavel: 'João Silva',
      ativo: true
    };

    service.criarCliente(clientePF).subscribe((criado) => {
      service.deletarCliente(criado.id);
      const encontrado = service.obterClientePorId(criado.id);
      expect(encontrado).toBeUndefined();
      done();
    });
  });

  it('deve lançar erro ao deletar cliente inexistente', () => {
    expect(() => service.deletarCliente('id_inexistente')).toThrowError();
  });

  // ============ FILTRAR ============

  it('deve filtrar clientes PF por nome', (done) => {
    const cliente1: Omit<ClientePF, 'id' | 'dataCriacao'> = {
      tipo: 'PF',
      nomeCliente: 'João Silva',
      cpf: '123.456.789-10',
      endereco: 'Rua A, 123',
      contato: 'joao@email.com',
      nomeResponsavel: 'João Silva',
      ativo: true
    };

    const cliente2: Omit<ClientePF, 'id' | 'dataCriacao'> = {
      tipo: 'PF',
      nomeCliente: 'Maria Santos',
      cpf: '987.654.321-00',
      endereco: 'Rua B, 456',
      contato: 'maria@email.com',
      nomeResponsavel: 'Maria Santos',
      ativo: true
    };

    service.criarCliente(cliente1).subscribe(() => {
      service.criarCliente(cliente2).subscribe(() => {
        const resultados = service.filtrarClientes('João');
        expect(resultados.length).toBe(1);
        expect(resultados[0].nomeCliente).toBe('João Silva');
        done();
      });
    });
  });

  it('deve filtrar clientes PJ por nome', (done) => {
    const cliente1: Omit<ClientePJ, 'id' | 'dataCriacao'> = {
      tipo: 'PJ',
      nomeCliente: 'Tech Solutions LTDA',
      cnpj: '12.345.678/0001-90',
      endereco: 'Av. B, 456',
      contato: 'contato@techsolutions.com',
      nomeResponsavel: 'Carlos Santos',
      ativo: true
    };

    const cliente2: Omit<ClientePJ, 'id' | 'dataCriacao'> = {
      tipo: 'PJ',
      nomeCliente: 'Consulting Group LTDA',
      cnpj: '98.765.432/0001-10',
      endereco: 'Av. C, 789',
      contato: 'contato@consulting.com',
      nomeResponsavel: 'Ana Silva',
      ativo: true
    };

    service.criarCliente(cliente1).subscribe(() => {
      service.criarCliente(cliente2).subscribe(() => {
        const resultados = service.filtrarClientes('Tech');
        expect(resultados.length).toBe(1);
        expect(resultados[0].nomeCliente).toBe('Tech Solutions LTDA');
        done();
      });
    });
  });

  it('deve retornar todos os clientes para filtro vazio', (done) => {
    const cliente1: Omit<ClientePF, 'id' | 'dataCriacao'> = {
      tipo: 'PF',
      nomeCliente: 'João Silva',
      cpf: '123.456.789-10',
      endereco: 'Rua A, 123',
      contato: 'joao@email.com',
      nomeResponsavel: 'João Silva',
      ativo: true
    };

    service.criarCliente(cliente1).subscribe(() => {
      const resultados = service.filtrarClientes('');
      expect(resultados.length).toBe(1);
      done();
    });
  });

  // ============ VALIDAÇÕES ============

  it('deve validar CPF com dígitos iguais como inválido', () => {
    const valido = service.validarCPF('111.111.111-11');
    expect(valido).toBeFalse();
  });

  it('deve validar CNPJ com dígitos iguais como inválido', () => {
    const valido = service.validarCNPJ('11.111.111/1111-11');
    expect(valido).toBeFalse();
  });

  it('deve validar CPF com comprimento inválido', () => {
    const valido = service.validarCPF('123.456.789');
    expect(valido).toBeFalse();
  });

  it('deve validar CNPJ com comprimento inválido', () => {
    const valido = service.validarCNPJ('12.345.678');
    expect(valido).toBeFalse();
  });

  // ============ PERSISTÊNCIA ============

  it('deve persistir clientes no localStorage', (done) => {
    const clientePF: Omit<ClientePF, 'id' | 'dataCriacao'> = {
      tipo: 'PF',
      nomeCliente: 'João Silva',
      cpf: '123.456.789-10',
      endereco: 'Rua A, 123',
      contato: 'joao@email.com',
      nomeResponsavel: 'João Silva',
      ativo: true
    };

    service.criarCliente(clientePF).subscribe(() => {
      const dados = localStorage.getItem('clientes');
      expect(dados).toBeTruthy();
      const clientes = JSON.parse(dados!);
      expect(clientes.length).toBe(1);
      done();
    });
  });

  // ============ LOGGING ============

  it('deve fazer log ao criar cliente localmente', (done) => {
    const spy = spyOn(loggerService, 'info');

    const clientePF: Omit<ClientePF, 'id' | 'dataCriacao'> = {
      tipo: 'PF',
      nomeCliente: 'João Silva',
      cpf: '123.456.789-10',
      endereco: 'Rua A, 123',
      contato: 'joao@email.com',
      nomeResponsavel: 'João Silva',
      ativo: true
    };

    service.criarCliente(clientePF).subscribe(() => {
      expect(spy).toHaveBeenCalledWith(
        'ClienteService',
        'Cliente criado localmente (sem API)',
        jasmine.objectContaining({ tipo: 'PF' })
      );
      done();
    });
  });

  it('deve fazer log de erro ao criar cliente inválido', (done) => {
    const spy = spyOn(loggerService, 'error');

    const clientePF: Omit<ClientePF, 'id' | 'dataCriacao'> = {
      tipo: 'PF',
      nomeCliente: 'João Silva',
      cpf: '000.000.000-00',
      endereco: 'Rua A, 123',
      contato: 'joao@email.com',
      nomeResponsavel: 'João Silva',
      ativo: true
    };

    service.criarCliente(clientePF).subscribe({
      next: () => done.fail('Deveria ter falhado'),
      error: () => {
        expect(spy).toHaveBeenCalledWith(
          'ClienteService',
          'Payload inválido para criação de cliente',
          jasmine.any(Object)
        );
        done();
      }
    });
  });
});
