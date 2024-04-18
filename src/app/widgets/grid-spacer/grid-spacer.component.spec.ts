import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridSpacerComponent } from './grid-spacer.component';

describe('GridSpacerComponent', () => {
  let component: GridSpacerComponent;
  let fixture: ComponentFixture<GridSpacerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridSpacerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridSpacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
