import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWidgetConnectionDialogComponent } from './edit-widget-connection-dialog.component';

describe('EditWidgetConnectionDialogComponent', () => {
  let component: EditWidgetConnectionDialogComponent;
  let fixture: ComponentFixture<EditWidgetConnectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWidgetConnectionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWidgetConnectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
