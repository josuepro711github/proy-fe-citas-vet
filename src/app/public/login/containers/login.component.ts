import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EventEmitterService } from 'src/app/core/shared/services/event-emitter.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  emailLogin!: FormControl;
  emailRegistro!: FormControl;

  tipo: number = 1;
  titulo: string = 'Iniciar';
  descripcion: string = 'Ingrese';
  nameBtn: string = 'Ingresar';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventEmitterService: EventEmitterService
    ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      emailLogin: ['', [Validators.email, Validators.required]],
      emailRegistro: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      passwordregistro: ['', Validators.required],
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
    if (val === 1) {
      //login
      this.router.navigate(['/doctores']);
      this.eventEmitterService.setRol(true);
    } else {
      //registro
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
}
