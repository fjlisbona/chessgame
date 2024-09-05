import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'chessboard-app',
  standalone: true,
  imports: [NgFor,CommonModule],
  templateUrl: './chessboard.component.html',
  styleUrl: './chessboard.component.scss'
})
export class ChessboardComponent {
rows: any=[`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`];
columns: any=[`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`];

}
