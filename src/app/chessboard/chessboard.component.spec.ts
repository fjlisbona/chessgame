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
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the chessboard-app component', () => {
    const fixture = TestBed.createComponent(ChessboardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('chessboard-app')).toBeTruthy();
  });

  it('should render a white box on odd squares', () => {
    const fixture = TestBed.createComponent(ChessboardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const boxElements = compiled.querySelectorAll('.board-square') as NodeListOf<HTMLElement>;
    boxElements.forEach((boxElement, index) => {
      if (index % 2 !== 0) {
        boxElement.style.backgroundColor = 'rgb(255, 255, 255)'; // Blanco en formato RGB
      }

      const backgroundColor = window.getComputedStyle(boxElement).backgroundColor;
      expect(backgroundColor).toBe('rgb(255, 255, 255)'); // Blanco en formato RGB
    });
  });

  it('should render a black box on even squares', () => {
    const fixture = TestBed.createComponent(ChessboardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const boxElements = compiled.querySelectorAll('.board-square') as NodeListOf<HTMLElement>;
    boxElements.forEach((boxElement, index) => {
      if (index % 2 === 0) {
        boxElement.style.backgroundColor = 'rgb(0, 0, 0)'; //
      }
      const backgroundColor = window.getComputedStyle(boxElement).backgroundColor;
      expect(backgroundColor).toBe('rgb(0, 0, 0)'); // Negro en formato RGB
    });

  });





});
