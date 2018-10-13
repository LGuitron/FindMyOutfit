import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaOutfitComponent } from './busca-outfit.component';

describe('BuscaOutfitComponent', () => {
  let component: BuscaOutfitComponent;
  let fixture: ComponentFixture<BuscaOutfitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaOutfitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaOutfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
