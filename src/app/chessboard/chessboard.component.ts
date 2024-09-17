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
  possibleMoves: { row: number, col: number }[] = [];

  onSquareClick(row: number, col: number): void {
    const piece = this.getPiece(row, col);
    if (piece && this.isWhitePiece(piece)) {
      this.selectedSquare = { row, col };
      this.possibleMoves = this.getPossibleMoves(row, col, piece);
    } else {
      this.selectedSquare = null;
      this.possibleMoves = [];
    }
  }

  isSelected(row: number, col: number): boolean {
    return this.selectedSquare?.row === row && this.selectedSquare?.col === col;
  }

  isPossibleMove(row: number, col: number): boolean {
    return this.possibleMoves.some(move => move.row === row && move.col === col);
  }

  isWhitePiece(piece: string): boolean {
    return ['♙', '♖', '♘', '♗', '♕', '♔'].includes(piece);
  }

  getPossibleMoves(row: number, col: number, piece: string): { row: number, col: number }[] {
    switch (piece) {
      case '♙': return this.getPawnMoves(row, col);
      case '♖': return this.getRookMoves(row, col);
      case '♘': return this.getKnightMoves(row, col);
      case '♗': return this.getBishopMoves(row, col);
      case '♕': return this.getQueenMoves(row, col);
      case '♔': return this.getKingMoves(row, col);
      default: return [];
    }
  }

  getPawnMoves(row: number, col: number): { row: number, col: number }[] {
    const moves = [];
    if (row > 0) {
      moves.push({ row: row - 1, col });
      if (row === 6) moves.push({ row: row - 2, col });
    }
    return moves;
  }

  getRookMoves(row: number, col: number): { row: number, col: number }[] {
    const moves = [];
    for (let i = 0; i < 8; i++) {
      if (i !== row) moves.push({ row: i, col });
      if (i !== col) moves.push({ row, col: i });
    }
    return moves;
  }
  
  getBishopMoves(row: number, col: number): { row: number, col: number }[] {
    const moves = [];
    for (let i = 1; i < 8; i++) {
      moves.push({ row: row + i, col: col + i }, { row: row + i, col: col - i },
                  { row: row - i, col: col + i }, { row: row - i, col: col - i });
    }
    return moves.filter(move => move.row >= 0 && move.row < 8 && move.col >= 0 && move.col < 8);
  }

  getKnightMoves(row: number, col: number): { row: number, col: number }[] {
    const moves = [
      { row: row - 2, col: col - 1 }, { row: row - 2, col: col + 1 },
      { row: row - 1, col: col - 2 }, { row: row - 1, col: col + 2 },
      { row: row + 1, col: col - 2 }, { row: row + 1, col: col + 2 },
      { row: row + 2, col: col - 1 }, { row: row + 2, col: col + 1 }
    ];
    return moves.filter(move => move.row >= 0 && move.row < 8 && move.col >= 0 && move.col < 8);
  }

  getQueenMoves(row: number, col: number): { row: number, col: number }[] {
    return [...this.getRookMoves(row, col), ...this.getBishopMoves(row, col)];
  }

  getKingMoves(row: number, col: number): { row: number, col: number }[] {
    const moves = [
      { row: row - 1, col: col - 1 }, { row: row - 1, col }, { row: row - 1, col: col + 1 },
      { row, col: col - 1 }, { row, col: col + 1 },
      { row: row + 1, col: col - 1 }, { row: row + 1, col }, { row: row + 1, col: col + 1 }
    ];
    return moves.filter(move => move.row >= 0 && move.row < 8 && move.col >= 0 && move.col < 8);
  }

  // ... resto del código existente ...
  
  pieces = [
    { white: '♖', black: '♜' },
    { white: '♘', black: '♞' },
    { white: '♗', black: '♝' },
    { white: '♕', black: '♛' },
    { white: '♔', black: '♚' },
    { white: '♗', black: '♝' },
    { white: '♘', black: '♞' },
    { white: '♖', black: '♜' }
  ];
  pawn = { white: '♙', black: '♟' };
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
