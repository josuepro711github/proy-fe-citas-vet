import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-infocita-cliente',
  templateUrl: './infocita-cliente.component.html',
  styleUrls: ['./infocita-cliente.component.scss']
})
export class InfocitaClienteComponent {

  constructor(
    public dialogRef: MatDialogRef<InfocitaClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public citaMascota: any
  ) {
    console.log("Cita: ", this.citaMascota);
  }
  estado= ["Pendiente","Terminado","Derivado","Cancelado"]


  onNoClick(): void {
    this.dialogRef.close();
  }
}
