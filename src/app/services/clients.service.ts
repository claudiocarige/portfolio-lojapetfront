import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Client } from '../models/modelClient';
import { INITIAL_CLIENTS } from '../data/clientsData';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private readonly STORAGE_KEY = 'lojaservicepet_clients';

  constructor() {
    this.ensureInitialData();
  }

  private ensureInitialData(): void {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(INITIAL_CLIENTS));
    }
  }

  private getStoredClients(): Client[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [...INITIAL_CLIENTS];
  }

  private saveClients(clients: Client[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(clients));
  }

  findAll(): Observable<Client[]> {
    return of(this.getStoredClients()).pipe(delay(150));
  }

  findById(id: any): Observable<Client> {
    const client = this.getStoredClients().find(c => String(c.id) === String(id));
    if (client) {
      return of({ ...client }).pipe(delay(150));
    }
    return throwError(() => ({ error: { message: 'Cliente não encontrado!' } }));
  }

  create(client: Client): Observable<Client> {
    const clients = this.getStoredClients();
    const newId = clients.length > 0 ? Math.max(...clients.map(c => Number(c.id) || 0)) + 1 : 1;
    const newClient: Client = {
      ...client,
      id: newId,
      criationDate: new Date().toLocaleDateString('pt-BR')
    };
    clients.push(newClient);
    this.saveClients(clients);
    return of(newClient).pipe(delay(150));
  }

  update(client: Client): Observable<Client> {
    const clients = this.getStoredClients();
    const index = clients.findIndex(c => String(c.id) === String(client.id));
    if (index !== -1) {
      clients[index] = { ...client };
      this.saveClients(clients);
      return of(clients[index]).pipe(delay(150));
    }
    return throwError(() => ({ error: { message: 'Cliente não encontrado para atualização!' } }));
  }

  delete(id: any): Observable<Client> {
    const clients = this.getStoredClients();
    const index = clients.findIndex(c => String(c.id) === String(id));
    if (index !== -1) {
      const deleted = clients.splice(index, 1)[0];
      this.saveClients(clients);
      return of(deleted).pipe(delay(150));
    }
    return throwError(() => ({ error: { message: 'Cliente não encontrado para exclusão!' } }));
  }

}
