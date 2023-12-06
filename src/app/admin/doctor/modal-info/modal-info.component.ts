import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss']
})
export class ModalInfoComponent {

  imagenSeleccionada: any = "https://www.writergirl.com/wp-content/uploads/2014/11/Doctor-790X1024.jpg";

  constructor(
    public dialogRef: MatDialogRef<ModalInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log("Doctor: ", data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
