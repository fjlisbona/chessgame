import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'chessboard-app',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './chessboard.component.html',
  styleUrl: './chessboard.component.scss'
})
export class ChessboardComponent {
  cols: any=[`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`];
  rows = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`];
  getPiece(i: number, j: number) {
    if (i === 0) {
      return this.pieces[j].black;
    } else if (i === 1) {
      return this.pawn.black;
    } else if (i === 6) {
      return this.pawn.white;
    } else if (i === 7) {
      return this.pieces[j].white;
    }
    return null; // Devuelve null para cualquier otro caso
  }
  
  selectedSquare: { row: number, col: number } | null = null;

  onSquareClick(row: number, col: number): void {
    if (this.isWhitePiece(row, col)) {
      this.selectedSquare = { row, col };
    } else {
      this.selectedSquare = null;
    }
  }

  isSelected(row: number, col: number): boolean {
    return this.selectedSquare?.row === row && this.selectedSquare?.col === col;
  }
  
  isWhitePiece(row: number, col: number): boolean {
    return row === 6 || row === 7; // Las piezas blancas están en las filas 6 y 7
  }
  
  // ... resto del código existente ...
  
  pieces = [
    { white: '&#9814;', black: '&#9820;', name: 'Torre' },
    { white: '&#9816;', black: '&#9822;', name: 'Caballo' },    
    { white: '&#9815;', black: '&#9821;', name: 'Alfil' },
    { white: '&#9813;', black: '&#9819;', name: 'Reina' },
    { white: '&#9812;', black: '&#9818;', name: 'Rey' },
    { white: '&#9815;', black: '&#9821;', name: 'Alfil' },
    { white: '&#9816;', black: '&#9822;', name: 'Caballo' },
    { white: '&#9814;', black: '&#9820;', name: 'Torre' },

  ];
  pawn = { white: '&#9817;', black: '&#9823;', name: 'Peon' };
  board: any =
    [
      { piece: this.pieces[0], color: 'black' },
      { piece: this.pieces[1], color: 'black' },
      { piece: this.pieces[2], color: 'black' },
      { piece: this.pieces[3], color: 'black' },
      { piece: this.pieces[4], color: 'black' },
      { piece: this.pieces[2], color: 'black' },
      { piece: this.pieces[1], color: 'black' },
      { piece: this.pieces[0], color: 'black' }
    ]

};
