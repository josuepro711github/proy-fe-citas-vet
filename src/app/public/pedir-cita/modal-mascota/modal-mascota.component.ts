import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-mascota',
  templateUrl: './modal-mascota.component.html',
  styleUrls: ['./modal-mascota.component.scss']
})
export class ModalMascotaComponent {
  fecha_cita = ""

  form!: FormGroup ;

  ngOnInit(): void {
    this.form = this.fb.group({
      alias: [''],
      genero: [''],
      fecha_nacimiento: [''],
      raza: [''],
      especie: ['']
    })
  }
  


  constructor (private fb: FormBuilder, public dialogRef: MatDialogRef<ModalMascotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){
      console.log("Data: ", data)
  }

  imagenSeleccionada: string | ArrayBuffer | null = null;
  imagenFileSeleccionado(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenSeleccionada = reader.result;

      };
      reader.readAsDataURL(file);

    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  formatoFecha(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    this.fecha_cita= `${year}-${month}-${day}`;

  }

  onDateSelected() {
    let fecha  = this.form.get('fecha')?.value
    this.formatoFecha(fecha)
  }

}
