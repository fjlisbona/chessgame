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
  cols: any=[`1`, ` 2`, ` 3`, ` 4`, ` 5`, ` 6`, ` 7`, `8`];
  rows = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`];
  getPiece(row: number, col: number): string | null {
    return this.board[row][col] || null;
  }
  
  selectedSquare: { row: number, col: number } | null = null;
  possibleMoves: { row: number, col: number }[] = [];

  isWhiteTurn: boolean = true;

  onSquareClick(row: number, col: number): void {
    if (!this.isWhiteTurn) return; // No permitir clicks durante el turno de las negras

    const piece = this.getPiece(row, col);

    if (this.selectedSquare) {
      if (this.isPossibleMove(row, col)) {
        this.movePiece(this.selectedSquare.row, this.selectedSquare.col, row, col);
        this.selectedSquare = null;
        this.possibleMoves = [];
        this.isWhiteTurn = false;
        
        // Activar el movimiento de la IA después de un breve retraso
        setTimeout(() => this.makeAIMove(), 500);
      } else if (piece && this.isWhitePiece(piece)) {
        this.selectedSquare = { row, col };
        this.possibleMoves = this.getPossibleMoves(row, col, piece);
      } else {
        this.selectedSquare = null;
        this.possibleMoves = [];
      }
    } else if (piece && this.isWhitePiece(piece)) {
      this.selectedSquare = { row, col };
      this.possibleMoves = this.getPossibleMoves(row, col, piece);
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
    const isWhite = this.isWhitePiece(this.getPiece(row, col)!);
    
    return moves.filter(move => 
      move.row >= 0 && move.row < 8 && move.col >= 0 && move.col < 8 &&
      !this.isOccupiedBySameColor(move.row, move.col, isWhite)
    );
  }

  isOccupiedBySameColor(row: number, col: number, isWhite: boolean): boolean {
    const piece = this.getPiece(row, col);
    return piece !== null && this.isWhitePiece(piece) === isWhite;
  }

  movePiece(fromRow: number, fromCol: number, toRow: number, toCol: number): void {
    const piece = this.getPiece(fromRow, fromCol);
    if (piece) {
      this.setPiece(fromRow, fromCol, null);
      this.setPiece(toRow, toCol, piece);
      console.log(`Pieza movida de (${fromRow},${fromCol}) a (${toRow},${toCol})`);
      
      if (this.isGameOver()) {
        this.gameOver = true;
        console.log('¡Juego terminado!');
      }
    }
  }

  setPiece(row: number, col: number, piece: string | null): void {
    this.board[row][col] = piece || '';
  }

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
  board: string[][] = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
  ];

  gameOver: boolean = false;

  makeAIMove(): void {
    console.log('IA está pensando...');
    const allPossibleMoves = this.getAllPossibleMoves(false);
    console.log('Movimientos posibles:', allPossibleMoves);
    if (allPossibleMoves.length > 0) {
      const move = this.selectBestMove(allPossibleMoves);
      console.log('Movimiento seleccionado:', move);
      this.movePiece(move.from.row, move.from.col, move.to.row, move.to.col);
      this.isWhiteTurn = true;
      
      if (this.isGameOver()) {
        this.gameOver = true;
      }
    } else {
      console.log('No hay movimientos posibles para las piezas negras');
    }
  }

  getAllPossibleMoves(isWhite: boolean): any[] {
    const moves: any[] = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.getPiece(row, col);
        if (piece) {
          console.log(`Pieza en (${row},${col}): ${piece}, isWhite: ${this.isWhitePiece(piece)}`);
          if (this.isWhitePiece(piece) !== isWhite) {
            const pieceMoves = this.getPossibleMoves(row, col, piece);
            console.log(`Movimientos posibles para ${piece} en (${row},${col}):`, pieceMoves);
            pieceMoves.forEach(move => {
              moves.push({ from: { row, col }, to: move });
            });
          }
        }
      }
    }
    console.log(`Total de movimientos encontrados: ${moves.length}`);
    return moves;
  }

  selectBestMove(moves: any[]): any {
    // Por ahora, simplemente seleccionamos un movimiento aleatorio
    return moves[Math.floor(Math.random() * moves.length)];
  }

  isGameOver(): boolean {
    // Implementa la lógica para verificar si el juego ha terminado
    // Por ejemplo, si un rey ha sido capturado
    const whiteKing = this.board.findIndex(row => row.includes('♔'));
    const blackKing = this.board.findIndex(row => row.includes('♚'));

    console.log('whiteKing:', whiteKing, 'blackKing:', blackKing);

    if (whiteKing === -1 || blackKing === -1) {
      return true;
    } else {
      return false;
    }
  }
};
