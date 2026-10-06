import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ServicePet } from '../models/moodelServicePet';
import { INITIAL_SERVICES_PET } from '../data/servicesData';

@Injectable({
  providedIn: 'root'
})
export class ServicePetService {

  private readonly STORAGE_KEY = 'lojaservicepet_services';

  constructor() {
    this.ensureInitialData();
  }

  private ensureInitialData(): void {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(INITIAL_SERVICES_PET));
    }
  }

  private getStoredServices(): ServicePet[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [...INITIAL_SERVICES_PET];
  }

  private saveServices(services: ServicePet[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(services));
  }

  private resolveNames(service: ServicePet): { nameClient: string; nameEmploye: string } {
    let nameClient = service.nameClient || '';
    if (!nameClient && service.client) {
      try {
        const clients = JSON.parse(localStorage.getItem('lojaservicepet_clients') || '[]');
        const foundClient = clients.find((c: any) => String(c.id) === String(service.client));
        if (foundClient) nameClient = foundClient.name;
      } catch {
        // fallback
      }
    }

    let nameEmploye = service.nameEmploye || '';
    if (!nameEmploye && service.employee) {
      try {
        const employees = JSON.parse(localStorage.getItem('lojaservicepet_employees') || '[]');
        const foundEmployee = employees.find((e: any) => String(e.id) === String(service.employee));
        if (foundEmployee) nameEmploye = foundEmployee.name;
      } catch {
        // fallback
      }
    }

    return { nameClient, nameEmploye };
  }

  findAll(): Observable<ServicePet[]> {
    return of(this.getStoredServices()).pipe(delay(150));
  }

  findById(id: any): Observable<ServicePet> {
    const service = this.getStoredServices().find(s => String(s.id) === String(id));
    if (service) {
      return of({ ...service }).pipe(delay(150));
    }
    return throwError(() => ({ error: { message: 'Serviço não encontrado!' } }));
  }

  create(servicePet: ServicePet): Observable<ServicePet> {
    const services = this.getStoredServices();
    const newId = services.length > 0 ? Math.max(...services.map(s => Number(s.id) || 0)) + 1 : 1;
    const { nameClient, nameEmploye } = this.resolveNames(servicePet);
    const today = new Date().toLocaleDateString('pt-BR');

    const newService: ServicePet = {
      ...servicePet,
      id: newId,
      nameClient,
      nameEmploye,
      openingDate: servicePet.openingDate || today,
      closingDate: String(servicePet.status) === '2' ? (servicePet.closingDate || today) : null
    };

    services.push(newService);
    this.saveServices(services);
    return of(newService).pipe(delay(150));
  }

  update(servicePet: ServicePet): Observable<ServicePet> {
    const services = this.getStoredServices();
    const index = services.findIndex(s => String(s.id) === String(servicePet.id));
    if (index !== -1) {
      const { nameClient, nameEmploye } = this.resolveNames(servicePet);
      const today = new Date().toLocaleDateString('pt-BR');

      const updated: ServicePet = {
        ...services[index],
        ...servicePet,
        nameClient: nameClient || services[index].nameClient,
        nameEmploye: nameEmploye || services[index].nameEmploye,
        closingDate: String(servicePet.status) === '2' ? (servicePet.closingDate || today) : null
      };

      services[index] = updated;
      this.saveServices(services);
      return of(services[index]).pipe(delay(150));
    }
    return throwError(() => ({ error: { message: 'Serviço não encontrado para atualização!' } }));
  }

  delete(id: any): Observable<ServicePet> {
    const services = this.getStoredServices();
    const index = services.findIndex(s => String(s.id) === String(id));
    if (index !== -1) {
      const deleted = services.splice(index, 1)[0];
      this.saveServices(services);
      return of(deleted).pipe(delay(150));
    }
    return throwError(() => ({ error: { message: 'Serviço não encontrado para exclusão!' } }));
  }

}
