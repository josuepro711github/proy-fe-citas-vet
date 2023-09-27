import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  pintar: number = 0;
  ruta: string = '';
  listaNavbar: string[] = ['Inicio', 'Contacto', 'Nosotros', 'Servicios', 'Consultorios', 'Blog'];
  rutaActiva: string = '';

  constructor(private router: Router) {
    this.rutaActiva = this.router.url;
  }

  ngOnInit(): void {
  }

  irRuta(valor: number) {
    switch (valor) {
      case 1:
        this.pintar = 1;
        this.ruta = '/home';
        break;
      case 2:
        this.pintar = 2;
        this.ruta = '/contacto';
        break;
      case 3:
        this.pintar = 3;
        this.ruta = '/nosotros';
        break;
      case 4:
        this.pintar = 4;
        this.ruta = '/servicios';
        break;
      case 5:
        this.pintar = 5;
        this.ruta = '/consultorios';
        break;
      case 6:
        this.pintar = 6;
        this.ruta = '/blog';
        break;
      case 7:
        this.pintar = 7;
        this.ruta = '/login-registro';
        break;
    }
    this.router.navigate([this.ruta]);  
  }

  

/*   irRuta(valor: number) {
    this.rutaActiva = this.router.url;
    switch (valor) {
      case 1:
        this.ruta = '/home';
        break;
      case 2:
        this.ruta = '/contacto';
        break;
      case 3:
        this.ruta = '/nosotros';
        break;
      case 4:
        this.ruta = '/servicios';
        break;
      case 5:
        this.ruta = '/consultorios';
        break;
      case 6:
        this.ruta = '/blog';
        break;
      case 7:
        this.ruta = '/login';
        break;
    }
    this.router.navigate([this.ruta]);
    console.log(this.rutaActiva)  
  } */


}
