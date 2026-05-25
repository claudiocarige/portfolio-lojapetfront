import { ClientePJ } from '../models/cliente.model';

const now = new Date();

export const MOCK_EMPRESAS: ClientePJ[] = [
  {
    id: 'pj_001',
    tipo: 'PJ',
    nomeEmpresa: 'CopyImagem Matriz',
    cnpj: '12.345.678/0001-90',
    endereco: 'Av. Principal, 100',
    nomeResponsavel: 'Carlos Silva',
    contato: '71999990001',
    dataCriacao: now,
    ativo: true
  },
  {
    id: 'pj_002',
    tipo: 'PJ',
    nomeEmpresa: 'BahiaTech Filial',
    cnpj: '98.765.432/0001-55',
    endereco: 'Rua Secundária, 200',
    nomeResponsavel: 'Mariana Souza',
    contato: '71999990002',
    dataCriacao: now,
    ativo: true
  }
];
