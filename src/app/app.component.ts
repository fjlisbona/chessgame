import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChessboardComponent } from './chessboard/chessboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ChessboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chessgame';
  chessboard: any; // Add the 'chessboard' property
}
