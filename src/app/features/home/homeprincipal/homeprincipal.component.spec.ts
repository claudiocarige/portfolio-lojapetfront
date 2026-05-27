import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { HomeprincipalComponent } from './homeprincipal.component';
import { API_BASE_URL } from '../../../core/config';

describe('HomeprincipalComponent', () => {
  let component: HomeprincipalComponent;
  let fixture: ComponentFixture<HomeprincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeprincipalComponent, NoopAnimationsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: '' }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeprincipalComponent);
    component = fixture.componentInstance;
    // não chamar detectChanges aqui para testar estado inicial (antes do ngOnInit)
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve injetar ChamadoService via inject()', () => {
    expect(component['chamadoService']).toBeTruthy();
  });

  it('deve injetar LoggerService via inject()', () => {
    expect(component['logger']).toBeTruthy();
  });

  it('deve inicializar com signal de chamados vazio', () => {
    expect(component.chamados()).toEqual([]);
  });

  it('deve logar ao inicializar', () => {
    const loggerSpy = spyOn(component['logger'], 'info');
    component.ngOnInit();
    expect(loggerSpy).toHaveBeenCalledWith(
      'HomeprincipalComponent',
      'Inicializando'
    );
  });
});
