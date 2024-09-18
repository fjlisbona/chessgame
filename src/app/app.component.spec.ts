import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ChessboardComponent } from './chessboard/chessboard.component';

describe('AppComponent', () => {
  let appFixture: ComponentFixture<AppComponent>;
  let chessboardFixture: ComponentFixture<ChessboardComponent>;
  let app: AppComponent;
  let chessboard: ChessboardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, ChessboardComponent],
    }).compileComponents();

    appFixture = TestBed.createComponent(AppComponent);
    chessboardFixture = TestBed.createComponent(ChessboardComponent);
    app = appFixture.componentInstance;
    chessboard = chessboardFixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'chessgame' title`, () => {
    expect(app.title).toEqual('chessgame');
  });

  it('should render title', () => {
    appFixture.detectChanges();
    const compiled = appFixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Welcome to Chessgame!');
  });

  it('should render chessboard', () => {
    chessboardFixture.detectChanges();
    const compiled = chessboardFixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.chessboard')).toBeTruthy();
  });

  it('should render check message', () => {
    chessboard.checkMessage = '¡Jaque al rey!';
    chessboardFixture.detectChanges();
    const compiled = chessboardFixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.check-message')?.textContent).toContain('¡Jaque al rey!');
  });

  it('should render checkmate message', () => {
    chessboard.checkmateMessage = '¡Jaque mate! Las blancas ganan.';
    chessboardFixture.detectChanges();
    const compiled = chessboardFixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.checkmate-message')?.textContent).toContain('¡Jaque mate! Las blancas ganan.');
  });

  it('should render draw message', () => {
    chessboard.drawMessage = 'El juego ha terminado en empate.';
    chessboardFixture.detectChanges();
    const compiled = chessboardFixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.draw-message')?.textContent).toContain('El juego ha terminado en empate.');
  });

  it('should render game over message', () => {
    chessboard.gameOverMessage = 'Juego terminado.';
    chessboardFixture.detectChanges();
    const compiled = chessboardFixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.game-over-message')?.textContent).toContain('Juego terminado.');
  });
});
