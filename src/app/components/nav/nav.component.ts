import { Component, OnInit     } from '@angular/core';
import { Router                } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector:     'app-nav',
  templateUrl:  './nav.component.html',
  styleUrls:   ['./nav.component.css']
})
export class NavComponent implements OnInit {
  showFiller = false;
  constructor(
    private         route:                Router,
    private authenticated: AuthenticationService,

  ) { }

  ngOnInit(): void {

  }

  logout() {
    this.route.navigate(['login']);
    //this.toast.success('Sessão encerrada.', 'L O G O U T', { timeOut: 4000})
    this.authenticated.logout();
  }
}
