
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
  nomeCliente: string;
  cpf: string;
}

export interface ClientePJ extends ClienteBase {
  tipo: 'PJ';
  nomeCliente: string;
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



