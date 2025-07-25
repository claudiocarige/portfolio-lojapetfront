import { Component, OnInit  } from '@angular/core';
import { UntypedFormControl, Validators   } from '@angular/forms';
import { Router                    } from '@angular/router';
import { ToastrService             } from 'ngx-toastr';
import { Credentials               } from 'src/app/models/credentials';
import { AuthenticationService     } from 'src/app/services/authentication.service';

@Component({
  selector:    'app-login',
  templateUrl: './login.component.html',
  styleUrls:  ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cred: Credentials = {
    email:    '',
    password: ''
  }

  email    = new UntypedFormControl(null,        Validators.email);
  password = new UntypedFormControl(null, Validators.minLength(6));

  constructor(
    private   toast:         ToastrService,
    private service: AuthenticationService,
    private   route:                 Router
  ) { }

  ngOnInit(): void {
  }

  login() {
      this.service.authentication(this.cred).subscribe(resposta => {
      this.service.successLogin(resposta.headers.get('Authorization').substring(7));
      this.route.navigate(['home'])
      this.toast.success('Login efetuado com sucesso!', 'L O G I N')
    }, () => {
      this.toast.error("Usuário e / senha inválidos!", "Error")
    })
  }

  validation(): boolean {
      return true;
  }
}
