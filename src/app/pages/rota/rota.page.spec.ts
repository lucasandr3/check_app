import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RotaPage } from './rota.page';

describe('RotaPage', () => {
  let component: RotaPage;
  let fixture: ComponentFixture<RotaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
