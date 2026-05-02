import { TestBed } from '@angular/core/testing';
import { ChamadoService, Chamado } from './chamado.service';
import { LoggerService } from './logger.service';

describe('ChamadoService', () => {
  let service: ChamadoService;
  let loggerService: LoggerService;
  let loggerSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChamadoService, LoggerService]
    });
    // Injetar LoggerService primeiro e espiar antes de instanciar ChamadoService
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
      jasmine.objectContaining({ total: 5 })
    );
  });

  describe('getChamados', () => {
    it('deve retornar array de chamados', () => {
      const chamados = service.getChamados();

      expect(chamados).toBeTruthy();
      expect(Array.isArray(chamados)).toBe(true);
      expect(chamados.length).toBe(5);
    });

    it('deve retornar chamados com estrutura válida', () => {
      const chamados = service.getChamados();

      chamados.forEach(chamado => {
        expect(chamado).toEqual(jasmine.objectContaining({
          id: jasmine.any(String),
          responsavel: jasmine.any(String),
          contato: jasmine.any(String),
          endereco: jasmine.any(String),
          description: jasmine.any(String)
        }));
      });
    });

    it('deve logar quando obtém chamados', () => {
      loggerSpy.calls.reset();

      service.getChamados();

      expect(loggerSpy).toHaveBeenCalledWith(
        'ChamadoService',
        'Obtendo chamados',
        jasmine.objectContaining({ total: 5 })
      );
    });

    it('deve retornar total de 5 chamados', () => {
      const chamados = service.getChamados();

      expect(chamados.length).toBe(5);
      expect(chamados[0].id).toBe('#_0001');
      expect(chamados[4].id).toBe('#_0005');
    });
  });

  describe('getChamadoById', () => {
    it('deve retornar chamado existente', () => {
      const chamado = service.getChamadoById('#_0001');

      expect(chamado).toBeTruthy();
      expect(chamado?.id).toBe('#_0001');
      expect(chamado?.responsavel).toBe('Luiz Henrique');
    });

    it('deve logar quando chamado é encontrado', () => {
      loggerSpy.calls.reset();

      service.getChamadoById('#_0001');

      expect(loggerSpy).toHaveBeenCalledWith(
        'ChamadoService',
        'Chamado encontrado',
        { id: '#_0001' }
      );
    });

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

    it('deve encontrar todos os 5 chamados', () => {
      for (let i = 1; i <= 5; i++) {
        const id = `#_000${i}`;
        const chamado = service.getChamadoById(id);

        expect(chamado).toBeTruthy();
        expect(chamado?.id).toBe(id);
      }
    });
  });

  describe('Dados de Chamados', () => {
    it('deve ter chamados com ids únicos', () => {
      const chamados = service.getChamados();
      const ids = chamados.map(c => c.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(chamados.length);
    });

    it('deve ter todos os chamados com contato válido', () => {
      const chamados = service.getChamados();

      chamados.forEach(chamado => {
        expect(chamado.contato).toMatch(/^\d{10,11}$/);
      });
    });

    it('deve ter endereço em comum para todos', () => {
      const chamados = service.getChamados();
      const enderecoPadrao = 'Rua Estevam Barbosa, 123';

      chamados.forEach(chamado => {
        expect(chamado.endereco).toBe(enderecoPadrao);
      });
    });
  });
});
