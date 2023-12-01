import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pedir-cita',
  templateUrl: './pedir-cita.component.html',
  styleUrls: ['./pedir-cita.component.scss']
})
export class PedirCitaComponent {

  form!: FormGroup;
  tipo_form = "Registrar"
  fecha_cita = ""


  hours: number[] = Array.from({ length: 12 }, (_, i) => i + 1); // 1 a 12
  minutes: number[] = Array.from({ length: 12 }, (_, i) => i * 5); // 0 a 59 
  amPmOptions: string[] = ['AM', 'PM'];

  mascotas: string[] = ['Panchito', 'Panchita', 'Jefe'];




  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      motivo: ['', Validators.required],
      nombrePaciente: [''],
      mascota: [''],
      hora: [3, Validators.required],
      minuto: [55, Validators.required],
      amPm: ['AM']
    });
  }

  
  agregarMascota() {
    // Lógica para agregar una nueva mascota
    console.log('Agregar mascota:', this.form.value.mascota);
  }



  submitForm() {
    if (this.form.valid) {
      // Aquí puedes enviar la información al servidor o realizar otras acciones
      console.log(this.form.value);
    }
  }

  validFormName(val: string): boolean {
    let esInvalido = false;
    if (this.form.get(val)?.invalid && this.form.get(val)?.touched) {
      esInvalido = true;
    }
    return esInvalido;
  }

  validHasError(val: string): number {
    let error = 0;
    if (this.form.get(val)?.hasError('required')) {
      error = 1;
    }
    if (this.form.get(val)?.hasError('email')) {
      error = 2;
    }
    return error;
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
