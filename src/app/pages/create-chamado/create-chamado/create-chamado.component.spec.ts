import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChamadoComponent } from './create-chamado.component';

describe('CreateChamadoComponent', () => {
  let component: CreateChamadoComponent;
  let fixture: ComponentFixture<CreateChamadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateChamadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
