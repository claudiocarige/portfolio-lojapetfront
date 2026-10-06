import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Employee } from '../models/modelEmployee';
import { INITIAL_EMPLOYEES } from '../data/employeesData';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private readonly STORAGE_KEY = 'lojaservicepet_employees';

  constructor() {
    this.ensureInitialData();
  }

  private ensureInitialData(): void {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(INITIAL_EMPLOYEES));
    }
  }

  private getStoredEmployees(): Employee[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [...INITIAL_EMPLOYEES];
  }

  private saveEmployees(employees: Employee[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(employees));
  }

  findAll(): Observable<Employee[]> {
    return of(this.getStoredEmployees()).pipe(delay(150));
  }

  findById(id: any): Observable<Employee> {
    const employee = this.getStoredEmployees().find(e => String(e.id) === String(id));
    if (employee) {
      return of({ ...employee }).pipe(delay(150));
    }
    return throwError(() => ({ error: { message: 'Funcionário não encontrado!' } }));
  }

  create(employee: Employee): Observable<Employee> {
    const employees = this.getStoredEmployees();
    const newId = employees.length > 0 ? Math.max(...employees.map(e => Number(e.id) || 0)) + 1 : 1;
    const newEmployee: Employee = {
      ...employee,
      id: newId,
      criationDate: new Date().toLocaleDateString('pt-BR')
    };
    employees.push(newEmployee);
    this.saveEmployees(employees);
    return of(newEmployee).pipe(delay(150));
  }

  update(employee: Employee): Observable<Employee> {
    const employees = this.getStoredEmployees();
    const index = employees.findIndex(e => String(e.id) === String(employee.id));
    if (index !== -1) {
      employees[index] = { ...employee };
      this.saveEmployees(employees);
      return of(employees[index]).pipe(delay(150));
    }
    return throwError(() => ({ error: { message: 'Funcionário não encontrado para atualização!' } }));
  }

  delete(id: any): Observable<Employee> {
    const employees = this.getStoredEmployees();
    const index = employees.findIndex(e => String(e.id) === String(id));
    if (index !== -1) {
      const deleted = employees.splice(index, 1)[0];
      this.saveEmployees(employees);
      return of(deleted).pipe(delay(150));
    }
    return throwError(() => ({ error: { message: 'Funcionário não encontrado para exclusão!' } }));
  }

}
