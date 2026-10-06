import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-nav',
  imports: [
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    HeaderComponent
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  showFiller = false;
  constructor(
    private route: Router,
    private authenticated: AuthenticationService,
  ) { }

  logout() {
    this.route.navigate(['login']);
    //this.toast.success('Sessão encerrada.', 'L O G O U T', { timeOut: 4000})
    this.authenticated.logout();
  }
}
