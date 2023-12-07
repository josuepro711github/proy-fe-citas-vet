import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import { lastValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/core/shared/components/alert/alert.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  form!: FormGroup;
  tipo_form = "Ver"
  fecha_nacimiento = ""
  isFormEditable = false;
  imagenFile: File | null = null;
  clienteActualizar:any;


  token:any;
  // es un ejemplo de objeto cliente usando el interfaz line 123
  cliente = {
    id_cliente: 0,
    id_usuario: 0,
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    dni: '',
    fechaNacimiento: '',
    telefono: '',
    imagen: '',
    email: '',
    contrasenia: '' // No deberías mostrar la contraseña en el frontend en un entorno real
  };
  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    public dialog: MatDialog
    ) {
    let token = JSON.parse(sessionStorage.getItem('token')?.toString() || '{}');

    // Asignar los valores del token al objeto cliente || aqui se tiene que implementar el service
    if (token != null) {
      this.cliente.nombre = token.nombre;
      this.cliente.apellidoPaterno = token.apellido_paterno;
      this.cliente.apellidoMaterno = token.apellido_materno;
      this.cliente.dni = token.dni;
      this.cliente.telefono = token.telefono;
      this.cliente.email = token.email;
      this.cliente.imagen = token.imagen;
      this.cliente.fechaNacimiento = token.fecha_nacimiento;
      this.fecha_nacimiento = token.fecha_nacimiento;
      this.cliente.id_cliente = token.id_cliente;
      this.cliente.id_usuario = token.id;
      this.token = token;
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
      imagen: [''],
      // Agrega otros campos según sea necesario
    });

    // deshabilitar el formulario por defecto
    this.form.disable();
    this.traerImagenCliente();
  }

  async traerImagenCliente(){
    try {
      const response = await lastValueFrom(
        this.clienteService.traerImagenCliente(
          this.cliente.imagen
        )
      );
      const reader = new FileReader();
      //aqui↓
      this.imagenFile = new File(
        [response],
        this.cliente.imagen,
        { type: response.type }
      );
      reader.onload = () => {
        this.imagenSeleccionada = reader.result;
      };
      reader.readAsDataURL(response);
    } catch (e) {
      console.log(e);
    }
  }
  
  submitForm() {
    if (this.form.valid) {
      // Aquí puedes enviar la información al servidor o realizar otras acciones
    
      let cliente = {
        id_cliente:this.cliente.id_cliente,
        usuario: {
          id_usuario: this.cliente.id_usuario,
          email: this.form.get('email')?.value,
          contrasenia: '',
          nombre: this.form.get('nombre')?.value,
          apellido_paterno: this.form.get('apellidoPaterno')?.value,
          apellido_materno: this.form.get('apellidoMaterno')?.value,
          dni: this.form.get('dni')?.value,
          fecha_nacimiento: this.fecha_nacimiento,
          telefono: this.form.get('telefono')?.value,
          imagen: this.cliente.imagen,
          rol: {
            id_rol: 3,
            tipo_rol: 'CLIENTE',
          }
        }   
      }
      console.log('cliente: ', cliente)
      this.clienteService.actualizarCliente(cliente,this.imagenFile).subscribe(resp => {
      this.token.nombre = cliente.usuario.nombre;  
      this.token.apellido_paterno = cliente.usuario.apellido_paterno;  
      this.token.apellido_materno = cliente.usuario.apellido_materno;  
      this.token.dni = cliente.usuario.dni;  
      this.token.fecha_nacimiento= cliente.usuario.fecha_nacimiento;  
      this.token.telefono = cliente.usuario.telefono;  
      this.token.email = cliente.usuario.email;  
      this.token.imagen = resp.usuario.imagen;
      let jsonToken = JSON.stringify(this.token);
      sessionStorage.setItem('token',jsonToken); 
      
      let dialogRef = this.dialog.open(AlertComponent, {
        data: {
          tipo: 'successful',
          mensaje: 'se actualizo correctamente!!',
        },
        disableClose: true,
        width: '400px',
        panelClass: 'custom-dialog-success',
      });
      setTimeout(() => {
        dialogRef.close();
      }, 1000);
      
      });
      console.log(this.form.value);
    }//
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
    this.fecha_nacimiento= `${year}-${month}-${day}`;

  }

  onDateSelected() {
    let fecha  = this.form.get('fechaNacimiento')?.value
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

  imagenSeleccionada: string | ArrayBuffer | null = null;
  imagenFileSeleccionado(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.imagenFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenSeleccionada = reader.result;

      };
      reader.readAsDataURL(file);
      if(this.tipo_form=="Actualizar"){
        this.cliente.imagen = "cambiado"
      }

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