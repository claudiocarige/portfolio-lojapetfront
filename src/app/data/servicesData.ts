import { ServicePet } from '../models/moodelServicePet';

export const INITIAL_SERVICES_PET: ServicePet[] = [
  {
    id: 1,
    title: 'Banho e Tosa Completa',
    priority: '1',
    status: '0',
    comments: 'Banho com produtos hipoalergênicos e tosa higiênica para Golden Retriever.',
    client: 1,
    employee: 3,
    nameClient: 'Ana Carolina Silva',
    nameEmploye: 'Rafael Oliveira (Groomer / Estética)',
    openingDate: '01/03/2024',
    closingDate: null
  },
  {
    id: 2,
    title: 'Consulta de Rotina e Vacinação',
    priority: '2',
    status: '1',
    comments: 'Aplicação da vacina V10 e avaliação clínica geral.',
    client: 2,
    employee: 2,
    nameClient: 'Bruno Henrique Ferreira',
    nameEmploye: 'Mariana Souza (Veterinária)',
    openingDate: '05/03/2024',
    closingDate: null
  },
  {
    id: 3,
    title: 'Limpeza de Tártaro',
    priority: '0',
    status: '2',
    comments: 'Procedimento odontológico preventivo realizado com sucesso.',
    client: 3,
    employee: 2,
    nameClient: 'Camila Santos Rocha',
    nameEmploye: 'Mariana Souza (Veterinária)',
    openingDate: '10/02/2024',
    closingDate: '10/02/2024'
  }
];

