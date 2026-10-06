import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastService } from 'src/app/services/toast.service';
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
  private readonly route = inject(Router);
  private readonly authenticated = inject(AuthenticationService);
  private readonly toast = inject(ToastService);

  logout(): void {
    this.route.navigate(['login']);
    this.toast.info('Sessão encerrada.');
    this.authenticated.logout();
  }
}
