import { Injectable } from '@angular/core';
import { Cliente, ClientePF, ClientePJ } from '../models/cliente.model';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly CONTEXT = 'ClienteService';
  private readonly STORAGE_KEY = 'clientes';
  private clientes: Cliente[] = [];

  constructor(private logger: LoggerService) {
    this.logger.info(this.CONTEXT, 'Serviço inicializado');
    this.carregarClientes();
  }

  /**
   * Criar novo cliente (PF ou PJ)
   */
  criarCliente(cliente: Omit<Cliente, 'id' | 'dataCriacao'>): Cliente {
    try {
      // Construir explicitamente conforme tipo para satisfazer o tipo discriminado
      if (cliente.tipo === 'PF') {
        const payload = cliente as Omit<ClientePF, 'id' | 'dataCriacao'>;
        if (!this.validarCPF(payload.cpf)) {
          throw new Error(`CPF inválido: ${payload.cpf}`);
        }

        const novoCliente: ClientePF = {
          id: this.gerarId(),
          dataCriacao: new Date(),
          tipo: 'PF',
          nomeCompleto: payload.nomeCompleto,
          cpf: payload.cpf,
          endereco: payload.endereco,
          nomeResponsavel: payload.nomeResponsavel,
          contato: payload.contato,
          ativo: payload.ativo ?? true
        };

        this.clientes.push(novoCliente);
        this.salvarClientes();

        this.logger.info(this.CONTEXT, 'Cliente PF criado com sucesso', {
          id: novoCliente.id,
          tipo: novoCliente.tipo
        });

        return novoCliente;
      } else {
        const payload = cliente as Omit<ClientePJ, 'id' | 'dataCriacao'>;
        if (!this.validarCNPJ(payload.cnpj)) {
          throw new Error(`CNPJ inválido: ${payload.cnpj}`);
        }

        const novoCliente: ClientePJ = {
          id: this.gerarId(),
          dataCriacao: new Date(),
          tipo: 'PJ',
          nomeEmpresa: payload.nomeEmpresa,
          cnpj: payload.cnpj,
          endereco: payload.endereco,
          nomeResponsavel: payload.nomeResponsavel,
          contato: payload.contato,
          ativo: payload.ativo ?? true
        };

        this.clientes.push(novoCliente);
        this.salvarClientes();

        this.logger.info(this.CONTEXT, 'Cliente PJ criado com sucesso', {
          id: novoCliente.id,
          tipo: novoCliente.tipo
        });

        return novoCliente;
      }
    } catch (error) {
      this.logger.error(this.CONTEXT, 'Erro ao criar cliente', {
        erro: String(error)
      });
      throw error;
    }
  }

  /**
   * Obter todos os clientes
   */
  obterClientes(): Cliente[] {
    this.logger.info(this.CONTEXT, 'Obtendo lista de clientes', {
      total: this.clientes.length
    });
    return [...this.clientes];
  }

  /**
   * Obter cliente por ID
   */
  obterClientePorId(id: string): Cliente | undefined {
    const cliente = this.clientes.find(c => c.id === id);

    if (!cliente) {
      this.logger.warn(this.CONTEXT, 'Cliente não encontrado', { id });
    } else {
      this.logger.info(this.CONTEXT, 'Cliente encontrado', { id });
    }

    return cliente;
  }

  /**
   * Atualizar cliente existente
   */
  atualizarCliente(id: string, clienteAtualizado: Partial<Cliente>): Cliente {
    const index = this.clientes.findIndex(c => c.id === id);

    if (index === -1) {
      throw new Error(`Cliente com ID ${id} não encontrado`);
    }

    const cliente = this.clientes[index];
    // Asserção de tipo para cobrir campos parciais e manter o tipo discriminado
    this.clientes[index] = { ...cliente, ...clienteAtualizado } as Cliente;

    this.salvarClientes();

    this.logger.info(this.CONTEXT, 'Cliente atualizado', { id });
    return this.clientes[index];
  }

  /**
   * Deletar cliente por ID
   */
  deletarCliente(id: string): void {
    const index = this.clientes.findIndex(c => c.id === id);

    if (index === -1) {
      throw new Error(`Cliente com ID ${id} não encontrado`);
    }

    this.clientes.splice(index, 1);
    this.salvarClientes();

    this.logger.info(this.CONTEXT, 'Cliente deletado', { id });
  }

  /**
   * Filtrar clientes por termo de busca (nome ou empresa)
   */
  filtrarClientes(termo: string): Cliente[] {
    if (!termo || termo.trim() === '') {
      return this.obterClientes();
    }

    const termoLower = termo.toLowerCase();
    const resultado = this.clientes.filter(cliente => {
      if (cliente.tipo === 'PF') {
        return (cliente as ClientePF).nomeCompleto.toLowerCase().includes(termoLower);
      } else {
        return (cliente as ClientePJ).nomeEmpresa.toLowerCase().includes(termoLower);
      }
    });

    this.logger.info(this.CONTEXT, 'Filtro aplicado', {
      termo,
      resultados: resultado.length
    });

    return resultado;
  }

  /**
   * Validar CPF (algoritmo básico)
   */
  validarCPF(cpf: string): boolean {
    // Remove caracteres não numéricos
    const cpfLimpo = cpf.replace(/\D/g, '');

    // CPF deve ter 11 dígitos
    if (cpfLimpo.length !== 11) {
      return false;
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpfLimpo)) {
      return false;
    }

    // Validação dos dígitos verificadores (simplificada)
    return true;
  }

  /**
   * Validar CNPJ (algoritmo básico)
   */
  validarCNPJ(cnpj: string): boolean {
    // Remove caracteres não numéricos
    const cnpjLimpo = cnpj.replace(/\D/g, '');

    // CNPJ deve ter 14 dígitos
    if (cnpjLimpo.length !== 14) {
      return false;
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{13}$/.test(cnpjLimpo)) {
      return false;
    }

    // Validação dos dígitos verificadores (simplificada)
    return true;
  }

  // ============ MÉTODOS PRIVADOS ============

  private gerarId(): string {
    return `cliente_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private salvarClientes(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.clientes));
    } catch (error) {
      this.logger.error(this.CONTEXT, 'Erro ao salvar clientes no localStorage', {
        erro: String(error)
      });
    }
  }

  private carregarClientes(): void {
    try {
      const dados = localStorage.getItem(this.STORAGE_KEY);
      if (dados) {
        this.clientes = JSON.parse(dados);
        this.logger.info(this.CONTEXT, 'Clientes carregados do localStorage', {
          total: this.clientes.length
        });
      } else {
        this.clientes = [];
        this.logger.info(this.CONTEXT, 'Nenhum cliente encontrado no localStorage');
      }
    } catch (error) {
      this.logger.error(this.CONTEXT, 'Erro ao carregar clientes do localStorage', {
        erro: String(error)
      });
      this.clientes = [];
    }
  }
}
