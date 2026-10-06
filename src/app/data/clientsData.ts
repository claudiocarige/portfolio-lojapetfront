import { Client } from '../models/modelClient';

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 1,
    name: 'Ana Carolina Silva',
    cpf: '12345678901',
    email: 'ana.silva@email.com',
    password: 'password123',
    profile: ['CLIENTE'],
    criationDate: '10/01/2024'
  },
  {
    id: 2,
    name: 'Bruno Henrique Ferreira',
    cpf: '23456789012',
    email: 'bruno.ferreira@email.com',
    password: 'password123',
    profile: ['CLIENTE'],
    criationDate: '15/02/2024'
  },
  {
    id: 3,
    name: 'Camila Santos Rocha',
    cpf: '34567890123',
    email: 'camila.rocha@email.com',
    password: 'password123',
    profile: ['CLIENTE'],
    criationDate: '02/03/2024'
  },
  {
    id: 4,
    name: 'Diego Ribeiro Lima',
    cpf: '45678901234',
    email: 'diego.lima@email.com',
    password: 'password123',
    profile: ['CLIENTE'],
    criationDate: '18/04/2024'
  }
];

