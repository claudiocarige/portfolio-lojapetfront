import { HttpClient   } from '@angular/common/http';
import { Injectable   } from '@angular/core';
import { Observable   } from 'rxjs';
import { API_URL      } from '../config/api.config';
import { Employee     } from '../models/dataEmployee';

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

  findById(id: any): Observable<Employee>{
    return this.http.get<Employee>(`${API_URL.urlBase}/employees/${id}`)
  }

  create(employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(`${API_URL.urlBase}/employees`, employee);
  }

  update(employee: Employee): Observable<Employee>{
    return this.http.put<Employee>(`${API_URL.urlBase}/employees/${employee.id}`, employee);
  }

  delete(id: any):Observable<Employee>{
    return this.http.delete<Employee>(`${API_URL.urlBase}/employees/${id}`);
  }
  
}
