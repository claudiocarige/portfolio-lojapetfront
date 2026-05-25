/**
 * Modelos de dados para o sistema de gestão de clientes
 * Suporta Pessoa Física (CPF) e Pessoa Jurídica (CNPJ)
 */

export interface ClienteBase {
  id: string;
  tipo: 'PF' | 'PJ';
  endereco: string;
  contato: string;
  nomeResponsavel: string;
  dataCriacao: Date;
  ativo: boolean;
}

export interface ClientePF extends ClienteBase {
  tipo: 'PF';
  nomeCompleto: string;
  cpf: string;
}

export interface ClientePJ extends ClienteBase {
  tipo: 'PJ';
  nomeEmpresa: string;
  cnpj: string;
}

// Union type que representa qualquer cliente (PF ou PJ)
export type Cliente = ClientePF | ClientePJ;

// Type guard para verificar se é PF
export function ehClientePF(cliente: Cliente): cliente is ClientePF {
  return cliente.tipo === 'PF';
}

// Type guard para verificar se é PJ
export function ehClientePJ(cliente: Cliente): cliente is ClientePJ {
  return cliente.tipo === 'PJ';
}
