import { Cliente, ClientePF, ClientePJ, ehClientePF, ehClientePJ } from '../models/cliente.model';
import { ClienteView } from '../models/cliente.viewmodel';

export function mapToView(cliente: Cliente): ClienteView {

  if (ehClientePF(cliente)) {
    return {
      id: cliente.id,
      tipo: cliente.tipo,
      nome: cliente.nomeCliente,
      documento: cliente.cpf,
      ativo: cliente.ativo
    };
  }

  return {
    id: cliente.id,
    tipo: cliente.tipo,
    nome: cliente.nomeCliente,
    documento: cliente.cnpj,
    ativo: cliente.ativo
  };
}

/**
 * Mapeia o payload bruto da API para o modelo de domínio do Angular.
 * Higieniza a data (String -> Date) e remove propriedades de documento que não pertencem ao tipo (CPF vs CNPJ).
 */
export function parseClienteAPI(apiData: any): Cliente {
  // Transforma a ISO string da API no objeto Date oficial do Javascript
  const dataConvertida = typeof apiData.dataCriacao === 'string' || typeof apiData.dataCriacao === 'number'
    ? new Date(apiData.dataCriacao)
    : apiData.dataCriacao || new Date();

  if (apiData.tipo === 'PF') {
    return {
      id: String(apiData.id),
      tipo: 'PF',
      nomeCliente: apiData.nomeCliente,
      cpf: apiData.cpf || '', // Remove cnpj se existir na API
      endereco: apiData.endereco,
      contato: apiData.contato,
      nomeResponsavel: apiData.nomeResponsavel,
      dataCriacao: dataConvertida,
      ativo: apiData.ativo ?? true
    };
  } else {
    return {
      id: String(apiData.id),
      tipo: 'PJ',
      nomeCliente: apiData.nomeCliente,
      cnpj: apiData.cnpj || '', // Remove cpf se existir na API
      endereco: apiData.endereco,
      contato: apiData.contato,
      nomeResponsavel: apiData.nomeResponsavel,
      dataCriacao: dataConvertida,
      ativo: apiData.ativo ?? true
    };
  }
}
