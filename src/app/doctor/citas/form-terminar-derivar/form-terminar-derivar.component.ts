import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { DoctorService } from 'src/app/admin/services/doctor.service';

@Component({
  selector: 'app-form-terminar-derivar',
  templateUrl: './form-terminar-derivar.component.html',
  styleUrls: ['./form-terminar-derivar.component.scss']
})
export class FormTerminarDerivarComponent {

  form!: FormGroup;
  citaMascota:any
  hours: number[] = Array.from({ length: 12 }, (_, i) => i + 1); // 1 a 12
  minutes: number[] = Array.from({ length: 12 }, (_, i) => i * 5); // 0 a 59
  amPmOptions: string[] = ['AM', 'PM'];
  especialidades:any[]=[]
  constructor( private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormTerminarDerivarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceDoctor:DoctorService
  ) {
    this.citaMascota = data
    console.log(data)


    this.form = this.fb.group({
      observaciones: ['', Validators.required],
      fecha_cita: ['', Validators.required],
      hora: [3, Validators.required],
      minuto: [55, Validators.required],
      amPm: ['AM'],
      especialidad:[""]
    });
  }

  async terminarCita(){

    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  submitForm(){

  }
  fecha_cita = ""
  formatoFecha(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    this.fecha_cita= `${year}-${month}-${day}`;

  }

  onDateSelected() {
    let fecha  = this.form.get('fecha_cita')?.value
    this.formatoFecha(fecha)
  }
}
