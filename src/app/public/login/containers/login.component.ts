import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  form!: FormGroup;
  emailLogin!: FormControl;
  emailRegistro!: FormControl;
  
  

  tipo: number = 1;
  titulo: string = 'Iniciar';
  descripcion: string = 'Ingrese';
  nameBtn: string = 'Ingresar';

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      emailLogin: ['', [Validators.email,  Validators.required]],
      emailRegistro: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
      passwordregistro: ['', Validators.required]
    });

  }


  executeForm(val: number){
    if(val === 1){
      //login
    }else {
      //registro
    }
  }

  irLogin(val: number){
    this.tipo = val;
    this.titulo = 'Iniciar';
    this.descripcion = 'Ingrese';
    this.nameBtn = 'Ingresar';
  }

  irRegistro(val: number){
    this.tipo = val;
    this.titulo = 'Registrar';
    this.descripcion = 'Registrese';
    this.nameBtn = 'Continuar';
  }
  
  
}
