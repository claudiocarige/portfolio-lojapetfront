import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api.config';
import { ServicePet } from '../models/ServicePet';

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
}
