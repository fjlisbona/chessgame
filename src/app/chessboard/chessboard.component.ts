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
  rows: any = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`];
  columns: any = [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`];
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
