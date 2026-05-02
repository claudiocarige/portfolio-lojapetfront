import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CreateChamadoComponent } from './create-chamado.component';

describe('CreateChamadoComponent', () => {
  let component: CreateChamadoComponent;
  let fixture: ComponentFixture<CreateChamadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateChamadoComponent, NoopAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve injetar LoggerService', () => {
    expect(component['logger']).toBeTruthy();
  });

  it('deve logar inicialização no ngOnInit', () => {
    const loggerSpy = spyOn(component['logger'], 'info');
    component.ngOnInit();
    expect(loggerSpy).toHaveBeenCalledWith(
      'CreateChamadoComponent',
      'Inicializando formulário'
    );
  });
});
