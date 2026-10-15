import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/credentials';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastService } from 'src/app/services/toast.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
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
  private readonly toast = inject(ToastService);

  readonly errorMessage = signal('');

  readonly loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)]
    })
  });

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.getRawValue();
    const cred: Credentials = {
      email: email.trim(),
      password: password.trim()
    };

    this.errorMessage.set('');
    this.service.authentication(cred).subscribe({
      next: (resposta) => {
        const authHeader = resposta.headers.get('Authorization') || resposta.headers.get('authorization');
        const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : (authHeader || 'mockToken');
        this.service.successLogin(token);
        this.toast.success('Login efetuado com sucesso!');
        this.route.navigate(['/home']);
      },
      error: (err) => {
        const msg = err.error?.message || 'Usuário e/ou senha inválidos!';
        this.errorMessage.set(msg);
        this.toast.error(msg);
      }
    });
  }
}
