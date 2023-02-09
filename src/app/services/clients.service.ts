import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api.config';
import { Client } from '../models/modelClient';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<Client[]>{
    return this.http.get<Client[]>(`${API_URL.urlBase}/clients`)
  }

  findById(id: any): Observable<Client>{
    return this.http.get<Client>(`${API_URL.urlBase}/clients/${id}`)
  }

  create(client: Client): Observable<Client>{
    return this.http.post<Client>(`${API_URL.urlBase}/clients`, client);
  }

  update(client: Client): Observable<Client>{
    return this.http.put<Client>(`${API_URL.urlBase}/clients/${client.id}`, client);
  }

  delete(id: any):Observable<Client>{
    return this.http.delete<Client>(`${API_URL.urlBase}/clients/${id}`);
  }
  
}