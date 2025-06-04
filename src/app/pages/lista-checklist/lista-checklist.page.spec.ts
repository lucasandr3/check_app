import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaChecklistPage } from './lista-checklist.page';

describe('ListaChecklistPage', () => {
  let component: ListaChecklistPage;
  let fixture: ComponentFixture<ListaChecklistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaChecklistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
