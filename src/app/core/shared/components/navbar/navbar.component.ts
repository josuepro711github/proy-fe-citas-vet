import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitterService } from '../../services/event-emitter.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  pintar: number = 0;
  ruta: string = '';
  listaNavbar: string[] = [
    'Inicio',
    'Contacto',
    'Nosotros',
    'Servicios',
    'Consultorios',
    'Blog',
  ];
  rutasAdmin: string[] = ['/doctores', '/citas'];
  rutaActiva: string = '';
  rolAdmin: boolean = false;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private eventEmitterService: EventEmitterService
  ) {
    this.rutaActiva = this.router.url;
  }

  ngOnInit(): void {
    this.eventEmitterService.getRol().subscribe((val) => (this.rolAdmin = val));
    if (this.rolAdmin) {
    } else {
    }

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


}
