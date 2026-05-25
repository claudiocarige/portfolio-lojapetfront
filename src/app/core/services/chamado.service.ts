import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

export interface Chamado {
  id: string;
  nomeEmpresa?: string; // Opcional, presente apenas para chamados relacionados a clientes PJ
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
  private chamados: Chamado[] = [
    {
      id: '#_0001',
      nomeEmpresa: 'Salvador Tech LTDA',
      responsavel: 'Luiz Henrique',
      contato: '7199999999',
      endereco: 'Rua Estevam Barbosa, 123',
      description: 'Descrição do chamado 1',
    },
    {
      id: '#_0002',
      nomeEmpresa: 'BahiaTech Matriz',
      responsavel: 'Maria eduarda',
      contato: '71888888888',
      endereco: 'Rua Estevam Barbosa, 123',
      description: 'Descrição do chamado 2',
    },
    {
      id: '#_0003',
      nomeEmpresa: 'Escola Hemariel',
      responsavel: 'João Pedro',
      contato: '71777777777',
      endereco: 'Rua Estevam Barbosa, 123',
      description: 'Descrição do chamado 3',
    },
    {
      id: '#_0004',
      nomeEmpresa: 'BahiaTech Filial',
      responsavel: 'Ana Clara',
      contato: '71666666666',
      endereco: 'Rua Estevam Barbosa, 123',
      description: 'Descrição do chamado 4',
    },
    {
      id: '#_0005',
      nomeEmpresa: 'CopyImagem Matriz',
      responsavel: 'Lucas Silva',
      contato: '71555555555',
      endereco: 'Rua Estevam Barbosa, 123',
      description: 'Descrição do chamado 5',
    },
  ];

  constructor(private logger: LoggerService) {
    this.logger.info(this.CONTEXT, 'Serviço inicializado', { total: this.chamados.length });
  }

  getChamados(): Chamado[] {
    this.logger.info(this.CONTEXT, 'Obtendo chamados', { total: this.chamados.length });
    return this.chamados;
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

  criarChamado(payload: Omit<Chamado, 'id'>): Chamado {
    const novo: Chamado = {
      id: `ch_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      ...payload
    };
    this.chamados.push(novo);
    this.logger.info(this.CONTEXT, 'Chamado criado', { id: novo.id });
    return novo;
  }
}
