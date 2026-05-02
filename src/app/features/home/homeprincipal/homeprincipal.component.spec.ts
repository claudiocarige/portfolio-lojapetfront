import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HomeprincipalComponent } from './homeprincipal.component';

describe('HomeprincipalComponent', () => {
  let component: HomeprincipalComponent;
  let fixture: ComponentFixture<HomeprincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeprincipalComponent, NoopAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeprincipalComponent);
    component = fixture.componentInstance;
    // não chamar detectChanges aqui para testar estado inicial (antes do ngOnInit)
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve injetar ChamadoService', () => {
    expect(component['chamadoService']).toBeTruthy();
  });

  it('deve injetar LoggerService', () => {
    expect(component['logger']).toBeTruthy();
  });

  it('deve inicializar com signal de chamados vazio', () => {
    expect(component.chamados()).toEqual([]);
  });

  it('deve logar ao criar componente', () => {
    const loggerSpy = spyOn(component['logger'], 'info');
    const newComponent = new HomeprincipalComponent(
      component['chamadoService'],
      component['logger']
    );
    expect(loggerSpy).toHaveBeenCalledWith(
      'HomeprincipalComponent',
      'Componente criado'
    );
  });

  it('deve carregar chamados no ngOnInit', () => {
    component.ngOnInit();
    const chamados = component.chamados();
    expect(chamados.length).toBe(5);
    expect(chamados[0].id).toBe('#_0001');
  });

  it('deve ter panelOpenState inicializado como false', () => {
    expect(component.panelOpenState()).toBe(false);
  });
});
