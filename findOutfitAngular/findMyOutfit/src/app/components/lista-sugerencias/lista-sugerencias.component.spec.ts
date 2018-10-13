import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSugerenciasComponent } from './lista-sugerencias.component';

describe('ListaSugerenciasComponent', () => {
  let component: ListaSugerenciasComponent;
  let fixture: ComponentFixture<ListaSugerenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaSugerenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSugerenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
