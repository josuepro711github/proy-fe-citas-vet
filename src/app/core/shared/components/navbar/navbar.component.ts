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
import { AuthService } from 'src/app/public/services/auth.service';

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
    'Nosotros',
    'Servicios',
    'Consultorios',
    'Blog',
  ];
  rutasAdmin: string[] = ['/doctores', '/citas'];
  rutaActiva: string = '';
  rol: number = 0;
  mostrarSubMenu = false;

  imagenSeleccionada: string | ArrayBuffer | null = null;
  token: any;

  constructor(
    private router: Router,
    private eventEmitterService: EventEmitterService,
    private authService: AuthService
  ) {
    this.rutaActiva = this.router.url;

    this.token = this.authService.obtenerToken();
    console.log(this.token);
    this.traerImagenCliente(this.token);
  }

  ngOnInit(): void {
    this.eventEmitterService.sessionStorageUpdate$.subscribe((key: string) => {
      if (key === 'token') {
        this.token = this.authService.obtenerToken();
        console.log('token', this.token);
        this.traerImagenCliente(this.token);
      }
    });
  }

  traerImagenCliente(token: any) {
    if (token != null) {
      this.authService
        .traerImagegnCliente(token.imagen)
        .subscribe((response) => {
          const reader = new FileReader();
          reader.onload = () => {
            this.imagenSeleccionada = reader.result;
          };
          reader.readAsDataURL(response);
        });
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
        this.ruta = '/nosotros';
        break;
      case 3:
        this.pintar = 3;
        this.ruta = '/servicios';
        break;
      case 4:
        this.pintar = 4;
        this.ruta = '/consultorios';
        break;
      case 5:
        this.pintar = 5;
        this.ruta = '/blog';
        break;
      
    }
    this.router.navigate([this.ruta]);
  }

  logout(){
    sessionStorage.removeItem('token');
    this.router.navigate(['/login-registro']);
  }

  cuenta(){
    this.router.navigate(['/cliente-ver-perfil']);
  }

}
