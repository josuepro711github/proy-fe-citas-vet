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
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  pintar: number = 0;
  ruta: string = '';
  listaNavbar: string[] = ['Inicio', 'Nosotros'];
  rutasAdmin: string[] = ['/doctores', '/citas'];
  rutaActiva: string = '';
  rol: number = 0;
  mostrarSubMenu = false;

  imagenSeleccionada: string | ArrayBuffer | null = null;
  token: any;

  constructor(
    private router: Router,
    public eventEmitterService: EventEmitterService,
    private authService: AuthService
  ) {
    this.rutaActiva = this.router.url;

    this.token = this.authService.obtenerToken();
    console.log(this.token);

    if(this.token!=null){
      this.traerImagenCliente(this.token);
      this.mostrarPedirCita(this.token.rol)
    }
    this.eventEmitterService.localStorageUpdate$.subscribe((key: string) => {
      if(key==='token'){
        this.token = this.authService.obtenerToken();
        this.traerImagenCliente(this.token);
        this.mostrarPedirCita(this.token.rol)
      }
    });

  }

  mostrarPedirCita(rol:number){
    if(rol===3 || this.token !=null){
      this.listaNavbar.splice(2,0,'Pedir Cita');
      console.log("Lista navbar: ", this.listaNavbar)
    }
  }
  ngOnInit(): void {
    console.log("rol: ", this.rol)
    if(this.rol===3){
      this.listaNavbar.splice(2,0,'Pedir Cita');
      console.log("Lista navbar: ", this.listaNavbar)
    }
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
        this.ruta = '/pedir-cita';
        break;
      
      case 6:
        this.pintar = 6;
        this.ruta = '/login-registro';
        break;
    }
    this.router.navigate([this.ruta]);
  }

  logout() {
    sessionStorage.removeItem('token');

    // emitir evento
    this.eventEmitterService.notificarActualizacion('token');


    this.router.navigate(['/login-registro']);

  }

  cuenta() {
    this.router.navigate(['/cliente-ver-perfil']);
  }
}
