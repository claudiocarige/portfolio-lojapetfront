import { Injectable, Inject } from '@angular/core';
import { LoggerService } from './logger.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_BASE_URL } from '../config';

export interface Chamado {
  id: string;
  nomeCliente?: string; // Opcional, presente apenas para chamados relacionados a clientes PJ
  responsavel: string;
  contato: string;
  endereco: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  private readonly CONTEXT = 'ChamadoService';
  private chamados: Chamado[] = [];

  private apiBase = '';

  constructor(
    private logger: LoggerService,
    private http: HttpClient,
    @Inject(API_BASE_URL) apiBase: string
  ) {
    this.apiBase = apiBase || '';
    this.logger.info(this.CONTEXT, 'Serviço inicializado', { total: this.chamados.length });
  }

  /**
   * Retorna os chamados atualmente carregados em memória
   */
  getChamados(): Chamado[] {
    this.logger.info(this.CONTEXT, 'Obtendo chamados (memória)', { total: this.chamados.length });
    return this.chamados;
  }

  /**
   * Busca chamados do endpoint configurado (se `API_BASE_URL` estiver definido) e atualiza a lista em memória.
   * Caso não haja `API_BASE_URL`, retorna os chamados locais.
   */
  async fetchChamados(): Promise<Chamado[]> {
    if (!this.apiBase) {
      this.logger.info(this.CONTEXT, 'fetchChamados: API_BASE_URL não configurado — usando memória');
      return this.getChamados();
    }

    try {
      const url = `${this.apiBase.replace(/\/$/, '')}/chamados`;
      const dados = await firstValueFrom(this.http.get<Chamado[]>(url));
      if (Array.isArray(dados)) {
        this.chamados = dados;
        this.logger.info(this.CONTEXT, 'Chamados carregados da API', { total: this.chamados.length });
      }
      return this.chamados;
    } catch (error) {
      this.logger.error(this.CONTEXT, 'Erro ao buscar chamados da API', { erro: String(error) });
      return this.getChamados();
    }
  }

  getChamadoById(id: string): Chamado | undefined {
    const chamado = this.chamados.find(c => c.id === id);
    if (chamado) {
      this.logger.info(this.CONTEXT, 'Chamado encontrado', { id });
    } else {
      this.logger.warn(this.CONTEXT, 'Chamado não encontrado', { id });
    }
    return chamado;
  }

  /**
   * Cria um chamado localmente e, se `API_BASE_URL` estiver configurado, envia para a API.
   */
  async criarChamado(payload: Omit<Chamado, 'id'>): Promise<Chamado> {
    const novo: Chamado = {
      id: `ch_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      ...payload
    };

    this.chamados.push(novo);
    this.logger.info(this.CONTEXT, 'Chamado criado (memória)', { id: novo.id });

    if (this.apiBase) {
      const url = `${this.apiBase.replace(/\/$/, '')}/chamados`;
      try {
        const serverResp = await firstValueFrom(this.http.post<Chamado>(url, novo));
        // Se a API retornou um recurso (possivelmente com outro ID), atualize a lista local
        const idx = this.chamados.findIndex(c => c.id === novo.id);
        if (idx !== -1) {
          this.chamados[idx] = serverResp;
        } else {
          this.chamados.push(serverResp);
        }

        this.logger.info(this.CONTEXT, 'Chamado criado na API', { id: serverResp.id });
        return serverResp;
      } catch (err) {
        this.logger.error(this.CONTEXT, 'Erro ao enviar chamado para API', { erro: String(err) });
        // fallback: retorna o item criado em memória
        return novo;
      }
    }

    return novo;
  }
}
