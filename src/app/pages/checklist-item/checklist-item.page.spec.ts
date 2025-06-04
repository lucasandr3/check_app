import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecklistItemPage } from './checklist-item.page';

describe('ChecklistItemPage', () => {
  let component: ChecklistItemPage;
  let fixture: ComponentFixture<ChecklistItemPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
