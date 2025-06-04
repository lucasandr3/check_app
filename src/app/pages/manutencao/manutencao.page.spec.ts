import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManutencaoPage } from './manutencao.page';

describe('ManutencaoPage', () => {
  let component: ManutencaoPage;
  let fixture: ComponentFixture<ManutencaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManutencaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
