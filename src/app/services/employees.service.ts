import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api.config';
import { Employee } from '../models/dataEmployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Employee[]>{
    return this.http.get<Employee[]>(`${API_URL.urlBase}/employees`)
  }

}
