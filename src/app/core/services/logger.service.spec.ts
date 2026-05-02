import { TestBed } from '@angular/core/testing';
import { LoggerService, LogLevel } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;
  let consoleLogSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService]
    });
    service = TestBed.inject(LoggerService);
    consoleLogSpy = spyOn(console, 'log');
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('log', () => {
    it('deve logar com timestamp, level, context e mensagem', () => {
      const context = 'TestComponent';
      const message = 'Test message';

      service.log('INFO', context, message);

      expect(consoleLogSpy).toHaveBeenCalled();
      const call = consoleLogSpy.calls.mostRecent();
      expect(call.args[0]).toContain('[INFO]');
      expect(call.args[0]).toContain('[TestComponent]');
      expect(call.args[0]).toContain('Test message');
    });

    it('deve incluir dados quando fornecidos', () => {
      const data = { userId: 123 };

      service.log('INFO', 'Test', 'Message', data);

      expect(consoleLogSpy).toHaveBeenCalledWith(jasmine.any(String), data);
    });

    it('deve logar sem dados quando não fornecidos', () => {
      service.log('INFO', 'Test', 'Message');

      expect(consoleLogSpy).toHaveBeenCalledWith(jasmine.any(String));
    });
  });

  describe('info', () => {
    it('deve logar com nível INFO', () => {
      service.info('TestContext', 'Info message', { id: 1 });

      expect(consoleLogSpy).toHaveBeenCalled();
      const call = consoleLogSpy.calls.mostRecent();
      expect(call.args[0]).toContain('[INFO]');
    });
  });

  describe('warn', () => {
    it('deve logar com nível WARN', () => {
      service.warn('TestContext', 'Warning message', { id: 2 });

      expect(consoleLogSpy).toHaveBeenCalled();
      const call = consoleLogSpy.calls.mostRecent();
      expect(call.args[0]).toContain('[WARN]');
    });
  });

  describe('error', () => {
    it('deve logar com nível ERROR', () => {
      service.error('TestContext', 'Error message', { id: 3 });

      expect(consoleLogSpy).toHaveBeenCalled();
      const call = consoleLogSpy.calls.mostRecent();
      expect(call.args[0]).toContain('[ERROR]');
    });
  });

  describe('timestamp', () => {
    it('deve incluir timestamp ISO válido', () => {
      service.info('Test', 'Message');

      const call = consoleLogSpy.calls.mostRecent();
      const logMessage = call.args[0];

      // Verifica padrão ISO 8601
      const isoRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
      expect(logMessage).toMatch(isoRegex);
    });
  });
});
