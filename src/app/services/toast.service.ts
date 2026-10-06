import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private readonly snackBar = inject(MatSnackBar);

  private readonly defaultConfig: MatSnackBarConfig = {
    duration: 3500,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  };

  success(message: string, action = 'OK'): void {
    this.snackBar.open(message, action, {
      ...this.defaultConfig,
      panelClass: ['toast-success']
    });
  }

  error(message: string, action = 'Fechar'): void {
    this.snackBar.open(message, action, {
      ...this.defaultConfig,
      duration: 5000,
      panelClass: ['toast-error']
    });
  }

  info(message: string, action = 'OK'): void {
    this.snackBar.open(message, action, {
      ...this.defaultConfig,
      panelClass: ['toast-info']
    });
  }
}

