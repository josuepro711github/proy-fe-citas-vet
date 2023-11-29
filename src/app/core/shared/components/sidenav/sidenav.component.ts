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
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  
  
  rol: boolean = false;
  name: string = '';

  imagenSeleccionada: string | ArrayBuffer | null = "../../../../../assets/icons/hueso.png";
  

  @Input() sidenavOpen: boolean = false;
  constructor(private router: Router){
    
    let token = JSON.parse( sessionStorage.getItem('token')?.toString() || '{}');
    console.log(token)

    if(token != null){
      this.rol = token.rol;
      this.name = token.nombre + ' ' + token['apellido paterno'];
      console.log(token);
      
      
      
    }
  }

  




  logout(){
    sessionStorage.removeItem('token');
    this.router.navigate(['/login-registro']);
  }
  
  

  @Input() enlaces: any[] = [];
  irEnlace(routeLink:string){
    this.router.navigate([routeLink])
  }
  // Función para determinar si un enlace está activo
  esEnlaceActivo(routeLink: string): boolean {
    return this.router.isActive(routeLink, false);
  }

  // Cuando se abre el sidenav se oculta el texto con una clase
  
 
}
