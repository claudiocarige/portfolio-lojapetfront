import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { API_BASE_URL } from './core/config';

// Ajuste `API_BASE_URL` para apontar ao seu projeto no mockapi.io, por exemplo:
// 'https://642f0b3c0c0913e5a6b0f0f3.mockapi.io'
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    { provide: API_BASE_URL, useValue: 'https://657dd3fe3e3f5b18946339c2.mockapi.io/api/v1/helpdesk' }
  ]
};
