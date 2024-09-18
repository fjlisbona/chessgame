import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-checkmate-dialog',
  template: `
    <h2 mat-dialog-title>¡Jaque Mate!</h2>
    <div mat-dialog-content>
      {{ data.message }}
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Cerrar</button>
    </div>
  `,
  styles: [`
    h2 { color: #d32f2f; }
  `]
})
export class CheckmateDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
