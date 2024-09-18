import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root'
})
export class ChessAIService {
  private model: tf.Sequential | undefined;
  private epsilon = 0.1; // Tasa de exploración

  constructor() {
    this.initModel();
  }

  private initModel() {
    this.model = tf.sequential();
    this.model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [64] }));
    this.model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
    this.model.add(tf.layers.dense({ units: 1, activation: 'linear' }));
    this.model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
  }

  getBoardState(board: string[][]): number[] {
    return board.flat().map(piece => {
      if (!piece) return 0;
      switch (piece) {
        case '♙': return 1;
        case '♖': return 2;
        case '♘': return 3;
        case '♗': return 4;
        case '♕': return 5;
        case '♔': return 6;
        case '♟': return -1;
        case '♜': return -2;
        case '♞': return -3;
        case '♝': return -4;
        case '♛': return -5;
        case '♚': return -6;
        default: return 0;
      }
    });
  }

  async predictBestMove(board: string[][], possibleMoves: any[]): Promise<any> {
    if (Math.random() < this.epsilon) {
      // Exploración: movimiento aleatorio
      return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    }

    // Explotación: usar el modelo para predecir el mejor movimiento
    const predictions = await Promise.all(possibleMoves.map(async move => {
      const newBoard = this.applyMove(board, move);
      const state = this.getBoardState(newBoard);
      const prediction = this.model?.predict(tf.tensor2d([state])) as tf.Tensor;
      const value = prediction?.dataSync()[0] ?? 0;
      return { move, value };
    }));

    return predictions.reduce((best, current) => current.value > best.value ? current : best).move;
  }

  private applyMove(board: string[][], move: any): string[][] {
    const newBoard = board.map(row => [...row]);
    const piece = newBoard[move.from.row][move.from.col];
    newBoard[move.from.row][move.from.col] = '';
    newBoard[move.to.row][move.to.col] = piece;
    return newBoard;
  }

  async train(state: number[], reward: number) {
    const target = reward;
    await this.model?.fit(tf.tensor2d([state]), tf.tensor2d([[target]]), {
      epochs: 1,
    });
  }
}
