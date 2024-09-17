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
    const isWhite = this.isWhitePiece(this.getPiece(row, col)!);
    const direction = isWhite ? -1 : 1;
    
    if (!this.isOccupiedBySameColor(row + direction, col, isWhite)) {
      moves.push({ row: row + direction, col });
      if ((isWhite && row === 6) || (!isWhite && row === 1)) {
        if (!this.isOccupiedBySameColor(row + 2 * direction, col, isWhite)) {
          moves.push({ row: row + 2 * direction, col });
        }
      }
    }
    
    return moves;
  }

  getRookMoves(row: number, col: number): { row: number, col: number }[] {
    const moves = [];
    const isWhite = this.isWhitePiece(this.getPiece(row, col)!);
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    for (const [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        if (this.isOccupiedBySameColor(x, y, isWhite)) break;
        moves.push({ row: x, col: y });
        if (this.getPiece(x, y) !== null) break;
        x += dx;
        y += dy;
      }
    }
    
    return moves;
  }

  getBishopMoves(row: number, col: number): { row: number, col: number }[] {
    const moves = [];
    const isWhite = this.isWhitePiece(this.getPiece(row, col)!);
    const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
    
    for (const [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        if (this.isOccupiedBySameColor(x, y, isWhite)) break;
        moves.push({ row: x, col: y });
        if (this.getPiece(x, y) !== null) break;
        x += dx;
        y += dy;
      }
    }
    
    return moves;
  }

  getKnightMoves(row: number, col: number): { row: number, col: number }[] {
    const moves = [
      { row: row - 2, col: col - 1 }, { row: row - 2, col: col + 1 },
      { row: row - 1, col: col - 2 }, { row: row - 1, col: col + 2 },
      { row: row + 1, col: col - 2 }, { row: row + 1, col: col + 2 },
      { row: row + 2, col: col - 1 }, { row: row + 2, col: col + 1 }
    ];
    const isWhite = this.isWhitePiece(this.getPiece(row, col)!);
    
    return moves.filter(move => 
      move.row >= 0 && move.row < 8 && move.col >= 0 && move.col < 8 &&
      !this.isOccupiedBySameColor(move.row, move.col, isWhite)
    );
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

  isOccupiedBySameColor(row: number, col: number, isWhite: boolean): boolean {
    const piece = this.getPiece(row, col);
    return piece !== null && this.isWhitePiece(piece) === isWhite;
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
