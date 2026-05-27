import { InjectionToken } from '@angular/core';

// Injection token para configurar a URL base da API (ex: https://<seu-projeto>.mockapi.io/api)
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
