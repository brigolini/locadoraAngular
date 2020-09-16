import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoVeiculoComponent } from './edicao-veiculo.component';

describe('EdicaoVeiculoComponent', () => {
  let component: EdicaoVeiculoComponent;
  let fixture: ComponentFixture<EdicaoVeiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicaoVeiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
