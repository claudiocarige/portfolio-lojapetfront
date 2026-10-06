import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/credentials';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private readonly service = inject(AuthenticationService);
  private readonly route = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly errorMessage = signal('');

  cred: Credentials = {
    email:    '',
    password: ''
  };

  email    = new UntypedFormControl(null,        Validators.email);
  password = new UntypedFormControl(null, Validators.minLength(6));

  login() {
    this.errorMessage.set('');
    this.service.authentication(this.cred)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resposta) => {
          const authHeader = resposta.headers.get('Authorization');
          if (authHeader) {
            this.service.successLogin(authHeader.substring(7));
            this.route.navigate(['home']);
          }
        },
        error: (err) => {
          this.errorMessage.set(err.error?.message || 'Usuário e/ou senha inválidos!');
        }
      });
  }

  validation(): boolean {
      return true;
  }
}
