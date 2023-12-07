import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss']
})
export class ModalInfoComponent {

  imagenSeleccionada: any;

  constructor(
    public dialogRef: MatDialogRef<ModalInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log("Doctor: ", data)
    this.imagenSeleccionada = data.usuario.imagen;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
