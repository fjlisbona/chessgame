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
  highlightedAIMove: { from: { row: number, col: number }, to: { row: number, col: number } } | null = null;

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
        
        // Calcular y mostrar el movimiento de la IA
        setTimeout(() => this.showAIMove(), 500);
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

  showAIMove(): void {
    console.log('IA está calculando el mejor movimiento...');
    this.debugBoard();
    const allPossibleMoves = this.getAllPossibleMoves(false); // false para piezas negras
    console.log('Movimientos posibles para negras:', allPossibleMoves);
    if (allPossibleMoves.length > 0) {
      const move = this.selectBestMove(allPossibleMoves);
      console.log('Mejor movimiento calculado:', move);
      if (move && move.from && move.to) {
        this.highlightedAIMove = move;
        console.log(`Movimiento de la IA: de (${move.from.row},${move.from.col}) a (${move.to.row},${move.to.col})`);
        
        // Ejecutar el movimiento de la IA después de un breve retraso
        setTimeout(() => {
          this.movePiece(move.from.row, move.from.col, move.to.row, move.to.col);
          this.highlightedAIMove = null;
          this.isWhiteTurn = true;
          console.log('Movimiento de la IA ejecutado');
          this.debugBoard();
        }, 1000); // Retraso de 1 segundo
      } else {
        console.error('Movimiento seleccionado no válido:', move);
      }
    } else {
      console.log('No hay movimientos posibles para las piezas negras');
    }
  }

  isSelected(row: number, col: number): boolean {
    return this.selectedSquare?.row === row && this.selectedSquare?.col === col;
  }
  isPossibleMove(row: number, col: number): boolean {
    return this.possibleMoves.some(move => move.row === row && move.col === col) ||
           (this.highlightedAIMove !== null && 
            this.highlightedAIMove.to.row === row && 
            this.highlightedAIMove.to.col === col);
  }

  isAIMove(row: number, col: number): boolean {
    return this.highlightedAIMove !== null &&
           this.highlightedAIMove.to.row === row &&
           this.highlightedAIMove.to.col === col;
  }

  isWhitePiece(piece: string): boolean {
    return ['♙', '♖', '♘', '♗', '♕', '♔'].includes(piece);
  }

  isBlackPiece(piece: string): boolean {
    return ['♟', '♜', '♞', '♝', '♛', '♚'].includes(piece);
  }

  getPossibleMoves(row: number, col: number, piece: string): { row: number, col: number }[] {
    console.log(`Obteniendo movimientos posibles para ${piece} en (${row},${col})`);
    switch (piece.toLowerCase()) {
      case '♙': return this.getWhitePawnMoves(row, col);
      case '♟': return this.getBlackPawnMoves(row, col);
      case '♖':
      case '♜': return this.getRookMoves(row, col);
      case '♘':
      case '♞': return this.getKnightMoves(row, col);
      case '♗':
      case '♝': return this.getBishopMoves(row, col);
      case '♕':
      case '♛': return this.getQueenMoves(row, col);
      case '♔':
      case '♚': return this.getKingMoves(row, col);
      default: return [];
    }
  }

  getWhitePawnMoves(row: number, col: number): { row: number, col: number }[] {
    const moves = [];
    if (row > 0 && !this.getPiece(row - 1, col)) {
      moves.push({ row: row - 1, col });
      if (row === 6 && !this.getPiece(row - 2, col)) {
        moves.push({ row: row - 2, col });
      }
    }
    if (row > 0 && col > 0 && this.isBlackPiece(this.getPiece(row - 1, col - 1) || '')) {
      moves.push({ row: row - 1, col: col - 1 });
    }
    if (row > 0 && col < 7 && this.isBlackPiece(this.getPiece(row - 1, col + 1) || '')) {
      moves.push({ row: row - 1, col: col + 1 });
    }
    return moves;
  }

  getBlackPawnMoves(row: number, col: number): { row: number, col: number }[] {
    const moves = [];
    if (row < 7 && !this.getPiece(row + 1, col)) {
      moves.push({ row: row + 1, col });
      if (row === 1 && !this.getPiece(row + 2, col)) {
        moves.push({ row: row + 2, col });
      }
    }
    if (row < 7 && col > 0 && this.isWhitePiece(this.getPiece(row + 1, col - 1) || '')) {
      moves.push({ row: row + 1, col: col - 1 });
    }
    if (row < 7 && col < 7 && this.isWhitePiece(this.getPiece(row + 1, col + 1) || '')) {
      moves.push({ row: row + 1, col: col + 1 });
    }
    return moves;
  }

  getRookMoves(row: number, col: number): { row: number, col: number }[] {
    const moves = [];
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    for (const [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      while (this.isValidPosition(x, y)) {
        if (!this.getPiece(x, y)) {
          moves.push({ row: x, col: y });
        } else {
          if (this.isOpponentPiece(row, col, x, y)) {
            moves.push({ row: x, col: y });
          }
          break;
        }
        x += dx;
        y += dy;
      }
    }
    return moves;
  }

  getKnightMoves(row: number, col: number): { row: number, col: number }[] {
    const moves = [];
    const knightMoves = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
    for (const [dx, dy] of knightMoves) {
      const x = row + dx;
      const y = col + dy;
      if (this.isValidPosition(x, y) && (!this.getPiece(x, y) || this.isOpponentPiece(row, col, x, y))) {
        moves.push({ row: x, col: y });
      }
    }
    return moves;
  }

  getBishopMoves(row: number, col: number): { row: number, col: number }[] {
    const moves = [];
    const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
    for (const [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      while (this.isValidPosition(x, y)) {
        if (!this.getPiece(x, y)) {
          moves.push({ row: x, col: y });
        } else {
          if (this.isOpponentPiece(row, col, x, y)) {
            moves.push({ row: x, col: y });
          }
          break;
        }
        x += dx;
        y += dy;
      }
    }
    return moves;
  }

  getQueenMoves(row: number, col: number): { row: number, col: number }[] {
    return [...this.getRookMoves(row, col), ...this.getBishopMoves(row, col)];
  }

  getKingMoves(row: number, col: number): { row: number, col: number }[] {
    const moves = [];
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
        const x = row + dx;
        const y = col + dy;
        if (this.isValidPosition(x, y) && (!this.getPiece(x, y) || this.isOpponentPiece(row, col, x, y))) {
          moves.push({ row: x, col: y });
        }
      }
    }
    return moves;
  }

  isValidPosition(row: number, col: number): boolean {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  }

  isOpponentPiece(fromRow: number, fromCol: number, toRow: number, toCol: number): boolean {
    const fromPiece = this.getPiece(fromRow, fromCol);
    const toPiece = this.getPiece(toRow, toCol);
    return fromPiece !== null && toPiece !== null && this.isWhitePiece(fromPiece) !== this.isWhitePiece(toPiece);
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
    } else {
      console.error(`No hay pieza en la posición (${fromRow},${fromCol})`);
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

  getAllPossibleMoves(isWhite: boolean): any[] {
    const moves: any[] = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = this.getPiece(row, col);
        if (piece) {
          console.log(`Pieza en (${row},${col}): ${piece}, isWhite: ${this.isWhitePiece(piece)}, isBlack: ${this.isBlackPiece(piece)}`);
          if (isWhite ? this.isWhitePiece(piece) : this.isBlackPiece(piece)) {
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
    if (moves.length === 0) {
      return null;
    }
    return moves[Math.floor(Math.random() * moves.length)];
  }

  debugBoard(): void {
    console.log('Estado actual del tablero:');
    this.board.forEach(row => {
      console.log(row.join(' '));
    });
  }

  isGameOver(): boolean {
    return this.gameOver;
  }
}   

