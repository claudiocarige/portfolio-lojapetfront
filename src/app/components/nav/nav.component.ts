import { Component, OnInit     } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector:     'app-nav',
  standalone:   true,
  imports: [
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    HeaderComponent
  ],
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
