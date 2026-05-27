export interface ClienteView {
  id: string;
  nome: string;
  documento: string;
  tipo: 'PF' | 'PJ';
  ativo: boolean;
}
