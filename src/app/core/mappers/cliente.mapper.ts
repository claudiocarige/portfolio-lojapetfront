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
