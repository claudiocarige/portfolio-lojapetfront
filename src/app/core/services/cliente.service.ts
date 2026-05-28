import { Injectable, inject } from '@angular/core';
import { Cliente, ClientePF, ClientePJ } from '../models/cliente.model';
import { LoggerService } from './logger.service';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../config';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { parseClienteAPI } from '../mappers/cliente.mapper';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly logger    = inject(LoggerService);
  private readonly http      = inject(HttpClient);
  private readonly apiBase   = inject(API_BASE_URL, { optional: true }) ?? '';

  private readonly CONTEXT     = 'ClienteService';
  private readonly STORAGE_KEY = 'clientes';
  private clientes: Cliente[]  = [];

  constructor() {
    this.logger.info(this.CONTEXT, 'Serviço inicializado');
    this.carregarClientes();
  }

  /**
   * Cria um novo cliente (PF ou PJ).
   * Envia HTTP POST para a API quando configurada; caso contrário, persiste localmente.
   */
  criarCliente(payload: Omit<Cliente, 'id' | 'dataCriacao'>): Observable<Cliente> {
    try {
      this.validarPayload(payload);
    } catch (error) {
      this.logger.error(this.CONTEXT, 'Payload inválido para criação de cliente', { erro: String(error) });
      return throwError(() => error);
    }

    if (!this.apiBase) {
      const novo = this.construirCliente(payload);
      this.clientes.push(novo);
      this.salvarClientes();
      this.logger.info(this.CONTEXT, 'Cliente criado localmente (sem API)', { id: novo.id, tipo: novo.tipo });
      return of(novo);
    }

    const url = `${this.apiBase.replace(/\/$/, '')}/clientes`;

    return this.http.post<any>(url, payload).pipe(
      map(novoApi => parseClienteAPI(novoApi)),
      tap(novo => {
        this.clientes.push(novo);
        this.salvarClientes();
        this.logger.info(this.CONTEXT, 'Cliente criado via API', { id: novo.id, tipo: novo.tipo });
      }),
      catchError(error => {
        this.logger.error(this.CONTEXT, 'Erro ao criar cliente via API', { erro: String(error) });
        return throwError(() => error);
      })
    );
  }

  /**
   * Retorna todos os clientes em memória.
   */
  obterClientes(): Cliente[] {
    this.logger.info(this.CONTEXT, 'Obtendo lista de clientes', { total: this.clientes.length });
    return [...this.clientes];
  }

  /**
   * Busca um cliente por ID.
   */
  obterClientePorId(id: string): Cliente | undefined {
    const cliente = this.clientes.find(c => String(c.id) === String(id));
    if (!cliente) {
      this.logger.warn(this.CONTEXT, 'Cliente não encontrado', { id });
    } else {
      this.logger.info(this.CONTEXT, 'Cliente encontrado', { id });
    }
    return cliente;
  }

  /**
   * Retorna um Observable com a lista de clientes da API.
   * Utiliza localStorage como fallback quando não há API configurada.
   */
  getEmpresas(): Observable<Cliente[]> {
    if (!this.apiBase) {
      this.logger.info(this.CONTEXT, 'getEmpresas: sem API configurada — usando localStorage');
      return of(this.obterClientes());
    }

    const url = `${this.apiBase.replace(/\/$/, '')}/clientes`;
    this.logger.info(this.CONTEXT, 'GET clientes URL', { url });

    return this.http.get<any[]>(url).pipe(
      map(list => (Array.isArray(list) ? list.map(parseClienteAPI) : [])),
      tap(list => {
        this.logger.info(this.CONTEXT, 'Clientes retornados pela API', { total: list.length });
        // Sincroniza o estado interno e o cache local com a API
        this.clientes = list;
        this.salvarClientes();
      }),
      catchError(error => {
        this.logger.error(this.CONTEXT, 'Erro ao buscar clientes da API', { erro: String(error) });
        return of(this.obterClientes());
      }),
      shareReplay(1)
    );
  }

  /**
   * Atualiza um cliente existente pelo ID.
   */
  atualizarCliente(id: string, clienteAtualizado: Partial<Cliente>): Cliente {
    const index = this.clientes.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error(`Cliente com ID ${id} não encontrado`);
    }
    this.clientes[index] = { ...this.clientes[index], ...clienteAtualizado } as Cliente;
    this.salvarClientes();
    this.logger.info(this.CONTEXT, 'Cliente atualizado', { id });
    return this.clientes[index];
  }

  /**
   * Remove um cliente pelo ID.
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
   * Filtra clientes pelo campo nomeCliente.
   */
  filtrarClientes(termo: string): Cliente[] {
    if (!termo?.trim()) {
      return this.obterClientes();
    }
    const termoLower = termo.toLowerCase();
    const resultado = this.clientes.filter(c =>
      c.nomeCliente.toLowerCase().includes(termoLower)
    );
    this.logger.info(this.CONTEXT, 'Filtro aplicado', { termo, resultados: resultado.length });
    return resultado;
  }

  /**
   * Valida CPF: tamanho 11 dígitos e dígitos não sequencialmente iguais.
   */
  validarCPF(cpf: string): boolean {
    const limpo = cpf.replace(/\D/g, '');
    if (limpo.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(limpo)) return false;
    return true;
  }

  /**
   * Valida CNPJ: tamanho 14 dígitos e dígitos não sequencialmente iguais.
   */
  validarCNPJ(cnpj: string): boolean {
    const limpo = cnpj.replace(/\D/g, '');
    if (limpo.length !== 14) return false;
    if (/^(\d)\1{13}$/.test(limpo)) return false;
    return true;
  }

  // ============ MÉTODOS PRIVADOS ============

  /**
   * Valida o payload antes de persistir. Lança Error se inválido.
   */
  private validarPayload(payload: Omit<Cliente, 'id' | 'dataCriacao'>): void {
    if (payload.tipo === 'PF') {
      const pf = payload as Omit<ClientePF, 'id' | 'dataCriacao'>;
      if (!this.validarCPF(pf.cpf)) {
        throw new Error(`CPF inválido: ${pf.cpf}`);
      }
    } else {
      const pj = payload as Omit<ClientePJ, 'id' | 'dataCriacao'>;
      if (!this.validarCNPJ(pj.cnpj)) {
        throw new Error(`CNPJ inválido: ${pj.cnpj}`);
      }
    }
  }

  /**
   * Constrói um objeto Cliente completo a partir do payload,
   * gerando id e dataCriacao localmente.
   */
  private construirCliente(payload: Omit<Cliente, 'id' | 'dataCriacao'>): Cliente {
    return {
      id: this.gerarId(),
      dataCriacao: new Date(),
      ...payload
    } as Cliente;
  }

  private gerarId(): string {
    return `cliente_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  private salvarClientes(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.clientes));
    } catch (error) {
      this.logger.error(this.CONTEXT, 'Erro ao salvar clientes no localStorage', { erro: String(error) });
    }
  }

  private carregarClientes(): void {
    try {
      const dados = localStorage.getItem(this.STORAGE_KEY);
      if (dados && dados !== 'undefined' && dados !== 'null') {
        this.clientes = JSON.parse(dados);
        this.logger.info(this.CONTEXT, 'Clientes carregados do localStorage', { total: this.clientes.length });
      } else {
        this.clientes = [];
        this.logger.info(this.CONTEXT, 'Nenhum cliente encontrado no localStorage');
      }
    } catch (error) {
      this.logger.error(this.CONTEXT, 'Erro ao carregar clientes do localStorage', { erro: String(error) });
      this.clientes = [];
    }
  }
}
