import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable        } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay             } from 'rxjs/operators';
import { API_URL           } from '../config/api.config';
import { Credentials       } from '../models/credentials';
import { MOCK_USERS        } from '../data/usersData';
import { jwtDecode         } from 'jwt-decode';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    //  authentication(cred: Credentials){
    // return this.http.post(`${API_URL.urlBase}/login`, cred, {
    //    observe: 'response',
    //    responseType: 'text'
    // });
  authentication(cred: Credentials): Observable<HttpResponse<string>> {
    const email = cred.email?.trim().toLowerCase();
    const password = cred.password?.trim();

    const userFound = MOCK_USERS.find(
      u => u.email.trim().toLowerCase() === email && u.password.trim() === password
    );

    if (userFound) {
      // Token JWT Mock (header.payload.signature)
      // Payload: {"sub": "testecrud@mail.com", "exp": 4070908800} -> exp no ano de 2099
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0ZWNydWRAbWFpbC5jb20iLCJleHAiOjQwNzA5MDg4MDB9.mockSignatureForFrontEndTesting';

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${mockToken}`
      });

      const response = new HttpResponse<string>({
        body: 'Success',
        headers: headers,
        status: 200
      });

      return of(response).pipe(delay(300));
    }

    return throwError(() => ({
      status: 401,
      error: { message: 'Usuário e/ou senha inválidos!' }
    })).pipe(delay(300));
  }
  successLogin(authToken: string){
    localStorage.setItem('token', authToken);

  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    try {
      const decoded = jwtDecode<{ exp?: number }>(token);
      if (decoded && decoded.exp) {
        return decoded.exp * 1000 > Date.now();
      }
      return true;
    } catch {
      return true;
    }
  }

  logout(){
    localStorage.clear();
  }
}
