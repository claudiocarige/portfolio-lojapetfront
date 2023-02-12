import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL    } from '../config/api.config';
import { ServicePet } from '../models/moodelServicePet';

@Injectable({
  providedIn: 'root'
})
export class ServicePetService {

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<ServicePet[]>{
  return this.http.get<ServicePet[]>(`${API_URL.urlBase}/servicepet`);
  }

  findById(id: any): Observable<ServicePet>{
    return this.http.get<ServicePet>(`${API_URL.urlBase}/servicepet/${id}`);
  }

  create(servicePet: ServicePet): Observable<ServicePet>{
    return this.http.post<ServicePet>(`${API_URL.urlBase}/servicepet`, servicePet);
  }

  update(servicePet: ServicePet): Observable<ServicePet>{
    return this.http.put<ServicePet>(`${API_URL.urlBase}/servicepet/${servicePet.id}`, servicePet);
  }

  delete(id: any): Observable<ServicePet>{
    return this.http.delete<ServicePet>(`${API_URL.urlBase}/servicepet/${id}`);
  }

}
