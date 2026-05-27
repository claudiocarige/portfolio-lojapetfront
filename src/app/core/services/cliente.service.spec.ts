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

  it('deve criar cliente pessoa física (PF) válido', () => {
    const clientePF: Omit<ClientePF, 'id' | 'dataCriacao'> = {
      tipo: 'PF',
      nomeCliente: 'João Silva',
      cpf: '123.456.789-10',
      endereco: 'Rua A, 123',
      contato: 'joao@email.com',
      nomeResponsavel: 'João Silva',
      ativo: true
    };

    const resultado = service.criarCliente(clientePF);

    expect(resultado).toBeTruthy();
    expect(resultado.id).toBeDefined();
    expect(resultado.tipo).toBe('PF');
    expect(resultado.dataCriacao).toBeDefined();
  });

  it('deve criar cliente pessoa jurídica (PJ) válido', () => {
    const clientePJ: Omit<ClientePJ, 'id' | 'dataCriacao'> = {
      tipo: 'PJ',
      nomeCliente: 'Tech Solutions LTDA',
      cnpj: '12.345.678/0001-90',
      endereco: 'Av. B, 456',
      contato: 'contato@techsolutions.com',
      nomeResponsavel: 'Carlos Santos',
      ativo: true
    };

    const resultado = service.criarCliente(clientePJ);

    expect(resultado).toBeTruthy();
    expect(resultado.id).toBeDefined();
    expect(resultado.tipo).toBe('PJ');
  });

  it('deve lançar erro ao criar cliente PF com CPF inválido', () => {
    const clientePF: Omit<ClientePF, 'id' | 'dataCriacao'> = {
      tipo: 'PF',
      nomeCliente: 'João Silva',
      cpf: '000.000.000-00',
      endereco: 'Rua A, 123',
      contato: 'joao@email.com',
      nomeResponsavel: 'João Silva',
      ativo: true
    };

    expect(() => service.criarCliente(clientePF)).toThrowError();
  });

  it('deve lançar erro ao criar cliente PJ com CNPJ inválido', () => {
    const clientePJ: Omit<ClientePJ, 'id' | 'dataCriacao'> = {
      tipo: 'PJ',
      nomeCliente: 'Tech Solutions LTDA',
      cnpj: '00.000.000/0000-00',
      endereco: 'Av. B, 456',
      contato: 'contato@techsolutions.com',
      nomeResponsavel: 'Carlos Santos',
      ativo: true
    };

    expect(() => service.criarCliente(clientePJ)).toThrowError();
  });

  // ============ OBTER CLIENTES ============

  it('deve obter lista de clientes', () => {
    const clientePF: Omit<ClientePF, 'id' | 'dataCriacao'> = {
      tipo: 'PF',
      nomeCliente: 'João Silva',
      cpf: '123.456.789-10',
      endereco: 'Rua A, 123',
      contato: 'joao@email.com',
      nomeResponsavel: 'João Silva',
      ativo: true
    };

    service.criarCliente(clientePF);
    const clientes = service.obterClientes();

    expect(clientes).toBeTruthy();
    expect(clientes.length).toBe(1);
  });

  it('deve retornar lista vazia quando não há clientes', () => {
    const clientes = service.obterClientes();
    expect(clientes).toEqual([]);
  });

  // ============ OBTER POR ID ============

  it('deve obter cliente por ID', () => {
    const clientePF: Omit<ClientePF, 'id' | 'dataCriacao'> = {
      tipo: 'PF',
      nomeCliente: 'João Silva',
      cpf: '123.456.789-10',
      endereco: 'Rua A, 123',
      contato: 'joao@email.com',
      nomeResponsavel: 'João Silva',
      ativo: true
    };

    const criado = service.criarCliente(clientePF);
    const encontrado = service.obterClientePorId(criado.id);

    expect(encontrado).toEqual(criado);
  });

  it('deve retornar undefined para cliente não encontrado', () => {
    const encontrado = service.obterClientePorId('id_inexistente');
    expect(encontrado).toBeUndefined();
  });

  // ============ ATUALIZAR ============

  it('deve atualizar cliente existente', () => {
    const clientePF: Omit<ClientePF, 'id' | 'dataCriacao'> = {
      tipo: 'PF',
      nomeCliente: 'João Silva',
      cpf: '123.456.789-10',
      endereco: 'Rua A, 123',
      contato: 'joao@email.com',
      nomeResponsavel: 'João Silva',
      ativo: true
    };

    const criado = service.criarCliente(clientePF);
    const atualizado = service.atualizarCliente(criado.id, {
      endereco: 'Rua Nova, 999'
    });

    expect(atualizado.endereco).toBe('Rua Nova, 999');
  });

  it('deve lançar erro ao atualizar cliente inexistente', () => {
    expect(() =>
      service.atualizarCliente('id_inexistente', { ativo: false })
    ).toThrowError();
  });

  // ============ DELETAR ============

  it('deve deletar cliente por ID', () => {
    const clientePF: Omit<ClientePF, 'id' | 'dataCriacao'> = {
      tipo: 'PF',
      nomeCliente: 'João Silva',
      cpf: '123.456.789-10',
      endereco: 'Rua A, 123',
      contato: 'joao@email.com',
      nomeResponsavel: 'João Silva',
      ativo: true
    };

    const criado = service.criarCliente(clientePF);
    service.deletarCliente(criado.id);

    const encontrado = service.obterClientePorId(criado.id);
    expect(encontrado).toBeUndefined();
  });

  it('deve lançar erro ao deletar cliente inexistente', () => {
    expect(() => service.deletarCliente('id_inexistente')).toThrowError();
  });

  // ============ FILTRAR ============

  it('deve filtrar clientes PF por nome', () => {
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

    service.criarCliente(cliente1);
    service.criarCliente(cliente2);

    const resultados = service.filtrarClientes('João');
    expect(resultados.length).toBe(1);
    expect(resultados[0].nomeCliente).toBe('João Silva');
  });

  it('deve filtrar clientes PJ por nome', () => {
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

    service.criarCliente(cliente1);
    service.criarCliente(cliente2);

    const resultados = service.filtrarClientes('Tech');
    expect(resultados.length).toBe(1);
    expect(resultados[0].nomeCliente).toBe('Tech Solutions LTDA');
  });

  it('deve retornar todos os clientes para filtro vazio', () => {
    const cliente1: Omit<ClientePF, 'id' | 'dataCriacao'> = {
      tipo: 'PF',
      nomeCliente: 'João Silva',
      cpf: '123.456.789-10',
      endereco: 'Rua A, 123',
      contato: 'joao@email.com',
      nomeResponsavel: 'João Silva',
      ativo: true
    };

    service.criarCliente(cliente1);
    const resultados = service.filtrarClientes('');

    expect(resultados.length).toBe(1);
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

  it('deve persistir clientes no localStorage', () => {
    const clientePF: Omit<ClientePF, 'id' | 'dataCriacao'> = {
      tipo: 'PF',
      nomeCliente: 'João Silva',
      cpf: '123.456.789-10',
      endereco: 'Rua A, 123',
      contato: 'joao@email.com',
      nomeResponsavel: 'João Silva',
      ativo: true
    };

    service.criarCliente(clientePF);

    const dados = localStorage.getItem('clientes');
    expect(dados).toBeTruthy();

    const clientes = JSON.parse(dados!);
    expect(clientes.length).toBe(1);
  });

  // ============ LOGGING ============

  it('deve fazer log ao criar cliente', () => {
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

    service.criarCliente(clientePF);

    expect(spy).toHaveBeenCalledWith(
      'ClienteService',
      'Cliente PF criado com sucesso',
      jasmine.objectContaining({ tipo: 'PF' })
    );
  });

  it('deve fazer log de erro ao criar cliente inválido', () => {
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

    try {
      service.criarCliente(clientePF);
    } catch (e) {
      // esperado
    }

    expect(spy).toHaveBeenCalledWith(
      'ClienteService',
      'Erro ao criar cliente',
      jasmine.any(Object)
    );
  });
});
