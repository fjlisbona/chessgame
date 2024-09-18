import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckmateDialogComponent } from './checkmate-dialog.component';

describe('CheckmateDialogComponent', () => {
  let component: CheckmateDialogComponent;
  let fixture: ComponentFixture<CheckmateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckmateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckmateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
