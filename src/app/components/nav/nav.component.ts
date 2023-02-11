import { Component, OnInit     } from '@angular/core';
import { Router                } from '@angular/router';
import { ToastrService         } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector:     'app-nav',
  templateUrl:  './nav.component.html',
  styleUrls:   ['./nav.component.css']
})
export class NavComponent implements OnInit {
  showFiller = false;
  constructor(
    private route: Router,
    private authenticated: AuthenticationService,
    private toast: ToastrService,

  ) { }

  ngOnInit(): void {
    this.route.navigate(['services/update']);
  }

  logout() {
    this.route.navigate(['login']);
    this.toast.success('Sessão encerrada', 'L O G O U T', { timeOut: 5000 })
    this.authenticated.logout();
  }
}
