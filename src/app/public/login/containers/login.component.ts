import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EventEmitterService } from 'src/app/core/shared/services/event-emitter.service';
import { AuthService } from '../auth.service';
import { Usuario } from 'src/app/core/models/Usuario';

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
    private eventEmitterService: EventEmitterService,
    private serviceAuth: AuthService
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
    let usuario:Usuario ={} as Usuario
    let password = this.form.get('password')?.value
    if(val === 1){
      let emailLogin = this.form.get('emailLogin')?.value
      usuario.email = emailLogin
      usuario.contrasenia = password
      this.serviceAuth.login(usuario).subscribe(response => sessionStorage.setItem('token',JSON.stringify(response)));
      this.router.navigate(['']);
    }else {
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
