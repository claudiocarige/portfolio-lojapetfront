import { TestBed } from '@angular/core/testing';
import { ChamadoService, Chamado } from './chamado.service';
import { LoggerService } from './logger.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { API_BASE_URL } from '../config';

describe('ChamadoService', () => {
  let service: ChamadoService;
  let loggerService: LoggerService;
  let loggerSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChamadoService, 
        LoggerService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: '' }
      ]
    });
    loggerService = TestBed.inject(LoggerService);
    loggerSpy = spyOn(loggerService, 'info');
    service = TestBed.inject(ChamadoService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve logar inicialização no constructor', () => {
    expect(loggerSpy).toHaveBeenCalledWith(
      'ChamadoService',
      'Serviço inicializado',
      jasmine.objectContaining({ total: 0 })
    );
  });

  describe('getChamados', () => {
    it('deve retornar array vazio inicialmente', () => {
      const chamados = service.getChamados();
      expect(chamados).toBeTruthy();
      expect(Array.isArray(chamados)).toBe(true);
      expect(chamados.length).toBe(0);
    });

    it('deve logar quando obtém chamados', () => {
      loggerSpy.calls.reset();
      service.getChamados();
      expect(loggerSpy).toHaveBeenCalledWith(
        'ChamadoService',
        'Obtendo chamados (memória)',
        jasmine.objectContaining({ total: 0 })
      );
    });
  });

  describe('getChamadoById', () => {
    it('deve retornar undefined para chamado inexistente', () => {
      const chamado = service.getChamadoById('#_9999');
      expect(chamado).toBeUndefined();
    });

    it('deve fazer warn quando chamado não é encontrado', () => {
      const warnSpy = spyOn(loggerService, 'warn');
      service.getChamadoById('#_9999');
      expect(warnSpy).toHaveBeenCalledWith(
        'ChamadoService',
        'Chamado não encontrado',
        { id: '#_9999' }
      );
    });
  });
});
