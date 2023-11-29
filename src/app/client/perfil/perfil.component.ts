import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  form!: FormGroup;
  tipo_form = "Ver"
  fecha_cita = ""
  isFormEditable = false;
  imagenSeleccionada: string | ArrayBuffer | null = "../../../../../assets/icons/hueso.png";



  // es un ejemplo de objeto cliente usando el interfaz line 123
  cliente = {
    nombre: 'Juan',
    apellidoPaterno: 'Pérez',
    apellidoMaterno: 'Gómez',
    dni: '12345678',
    fechaNacimiento: '01/01/1990',
    telefono: '987654321',
    imagen: 'url-de-la-imagen.jpg',
    email: 'juan@example.com',
    contrasenia: '********' // No deberías mostrar la contraseña en el frontend en un entorno real
  };
  constructor(private fb: FormBuilder) {
    let token = JSON.parse(sessionStorage.getItem('token')?.toString() || '{}');

    // Asignar los valores del token al objeto cliente || aqui se tiene que implementar el service
    if (token != null) {
      this.cliente.nombre = token.nombre;
      this.cliente.apellidoPaterno = token['apellido paterno'];
      this.cliente.apellidoMaterno = token['apellido materno'];
      this.cliente.dni = token.dni;
      this.cliente.fechaNacimiento = token['fecha y hora'];
      this.cliente.telefono = token.telefono;
      this.cliente.email = token.email;
    }

    // solo asigna los valores del cliente al form
    this.form = this.fb.group({
      nombre: [this.cliente.nombre, Validators.required],
      apellidoPaterno: [this.cliente.apellidoPaterno, Validators.required],
      apellidoMaterno: [this.cliente.apellidoMaterno, Validators.required],
      dni: [this.cliente.dni, Validators.required],
      fechaNacimiento: [this.cliente.fechaNacimiento, Validators.required],
      telefono: [this.cliente.telefono, Validators.required],
      email: [this.cliente.email, [Validators.required, Validators.email]],
      // Agrega otros campos según sea necesario
    });

    // deshabilitar el formulario por defecto
    this.form.disable();
    
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

  editarPerfil(): void {
    // Lógica para la edición del perfil (si es necesario)
  }

  toggleFormEditable() {
    this.isFormEditable = !this.isFormEditable;

    // Habilitar o deshabilitar el formulario según el estado
    if (this.isFormEditable) {
      // Habilitar el formulario
      this.form.enable();
      this.tipo_form = "Actualizar";
    } else {
      // Deshabilitar el formulario
      this.form.disable();
      this.tipo_form = "Ver";
    }
  }



}

// Ejemplo de interfaz cliente
export interface Cliente {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  dni: string;
  fechaNacimiento: string;
  telefono: string;
  imagen: string;
  email: string;
  contrasenia: string;
}