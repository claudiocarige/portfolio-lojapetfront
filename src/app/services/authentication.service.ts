import { HttpClient        } from '@angular/common/http';
import { Injectable        } from '@angular/core';
import { API_URL           } from '../config/api.config';
import { Credentials       } from '../models/credentials';
import { JwtHelperService  } from '@auth0/angular-jwt';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  jwtService: JwtHelperService = new JwtHelperService();
  constructor(
    private http: HttpClient,
  ) { }

  authentication(cred: Credentials){
    return this.http.post(`${API_URL.urlBase}/login`, cred, {
       observe: 'response',
       responseType: 'text'
    });
  }
  successLogin(authToken: string){
    localStorage.setItem('token', authToken);

  }

  isAuthenticated(){
    let token = localStorage.getItem('token');
    if(token != null){
      return !this.jwtService.isTokenExpired(token);
    }
    return false;
  }

  logout(){
    localStorage.clear();
  }
}
