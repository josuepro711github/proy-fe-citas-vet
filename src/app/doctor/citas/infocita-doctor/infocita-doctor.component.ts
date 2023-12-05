import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-infocita-doctor',
  templateUrl: './infocita-doctor.component.html',
  styleUrls: ['./infocita-doctor.component.scss']
})
export class InfocitaDoctorComponent {

  observaciones: string = '';
  
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      observaciones: [''],
    });
  }

  constructor(
    public dialogRef: MatDialogRef<InfocitaDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) public citaMascota: any, private fb: FormBuilder,
  ) { 
    
    console.log("Cita: ", citaMascota);
  }

  guardarCita(cita: any) {
  console.log("Cita: ", cita);
  console.log("Observaciones: ", this.form.get('observaciones')?.value);
  cita.observaciones = this.form.get('observaciones')?.value;
  console.log("Cita: ", cita);
  // Aquí puedes realizar la lógica para guardar la cita y las observaciones
  this.dialogRef.close();

}


  onNoClick(): void {
    this.dialogRef.close();
  }
}