import { Employee } from '../models/modelEmployee';

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 1,
    name: 'Cláudio Carigé (Admin)',
    cpf: '98765432100',
    email: 'testeclaudio@petstar.com',
    password: 'password123',
    profile: ['ADMIN', 'TECNICO'],
    criationDate: '01/01/2024'
  },
  {
    id: 2,
    name: 'Mariana Souza (Veterinária)',
    cpf: '87654321099',
    email: 'mariana.souza@petstar.com',
    password: 'password123',
    profile: ['TECNICO'],
    criationDate: '12/01/2024'
  },
  {
    id: 3,
    name: 'Rafael Oliveira (Groomer / Estética)',
    cpf: '76543210988',
    email: 'rafael.oliveira@petstar.com',
    password: 'password123',
    profile: ['TECNICO'],
    criationDate: '05/02/2024'
  }
];
