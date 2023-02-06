import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authenService: AuthenticationService,
    private route: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    let autheticated = this.authenService.isAuthenticated()
    if(autheticated){
      return true;
    }else{
      this.route.navigate(['login']);
      return false;
    }
  }
  
}
