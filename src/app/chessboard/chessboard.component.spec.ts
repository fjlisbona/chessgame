import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessboardComponent } from './chessboard.component';

describe('ChessboardComponent', () => {
  let component: ChessboardComponent;
  let fixture: ComponentFixture<ChessboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChessboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChessboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ChessboardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('chessboard-app')).toBeTruthy();
  });
});
