import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EventEmitterService } from 'src/app/core/shared/services/event-emitter.service';
import { Usuario } from 'src/app/core/models/Usuario';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-registro',
  templateUrl: './login-registro.component.html',
  styleUrls: ['./login-registro.component.scss'],
})
export class LoginRegistroComponent {
  form!: FormGroup;
  emailLogin!: FormControl;
  emailRegistro!: FormControl;

  tipo: number = 1;
  titulo: string = 'Iniciar';
  descripcion: string = 'Ingrese';
  nameBtn: string = 'Ingresar';
  imagenFile: File | null = null;
  fecha_nacimiento = '';

  contraseniaIncorrecta: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventEmitterService: EventEmitterService,
    private serviceAuth: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      //Login
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],

      //Registro
      nombres: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      dni: ['', Validators.required],
      telefono: ['', Validators.required],
      imagen: [''],
    });
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

  executeForm(val: number) {
    let usuario: Usuario = {} as Usuario;
    let password = this.form.get('password')?.value;
    if (val === 1) {
      let emailLogin = this.form.get('email')?.value;
      usuario.email = emailLogin;
      usuario.contrasenia = password;
      this.serviceAuth.login(usuario).subscribe(
        (response) => {
          sessionStorage.setItem('token', JSON.stringify(response));

          if (response.rol === 1) {
            this.router.navigate(['admin-listar-doctor']);
          } else if (response.rol === 2) {
            this.router.navigate(['doctor-listar-citas']);
          } else {
            this.eventEmitterService.$rol.emit(3);
            this.router.navigate(['home']).then(() => {
              // Recargar la página después de la navegación
              // window.location.reload();
            });
          }

          console.log(response);
        },
        (error) => {
          console.log(error.status.toString());
          if (error.status == 400) {
            console.log('Contrasenia incorrecta');
            this.contraseniaIncorrecta = true;
            this.form.get('password')?.setErrors({ incorrect: true });
          }
        }
      );
    } else {
      let email = this.form.get('email')?.value;
      let contrasenia = this.form.get('password')?.value;
      let nombre = this.form.get('nombres')?.value;
      let apellido_paterno = this.form.get('apellido_paterno')?.value;
      let apellido_materno = this.form.get('apellido_materno')?.value;
      let dni = this.form.get('dni')?.value;
      let telefono = this.form.get('telefono')?.value;

      let cliente = {
        id_cliente: 0,
        usuario: {
          id_usuario: 0,
          email: email,
          contrasenia: contrasenia,
          nombre: nombre,
          apellido_paterno: apellido_paterno,
          apellido_materno: apellido_materno,
          dni: dni,
          fecha_nacimiento: this.fecha_nacimiento,
          telefono: telefono,
          imagen: '..',
          rol: {
            id_rol: 1,
            tipo_rol: 'Cliente',
          },
        },
      };
      this.serviceAuth
        .registrarCliente(cliente, this.imagenFile)
        .subscribe((response) => {
          usuario.email = email;
          usuario.contrasenia = contrasenia;
          this.serviceAuth.login(usuario).subscribe((response) => {
            sessionStorage.setItem('token', JSON.stringify(response));
            this.router.navigate(['']);
            console.log(response);
          });
        });
    }
  }

  irLogin(val: number) {
    this.tipo = val;
    this.titulo = 'Iniciar';
    this.descripcion = 'Ingrese';
    this.nameBtn = 'Ingresar';
  }

  irRegistro(val: number) {
    this.tipo = val;
    this.titulo = 'Registrar';
    this.descripcion = 'Registrese';
    this.nameBtn = 'Continuar';
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
      console.log(file);
    }
  }

  onDateSelected() {
    let fecha_nacimiento = this.form.get('fecha_nacimiento')?.value;
    this.formatoFecha(fecha_nacimiento);
  }

  formatoFecha(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    this.fecha_nacimiento = `${year}-${month}-${day}`;
  }
}
