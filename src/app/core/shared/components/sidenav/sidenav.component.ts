import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  @Input() sidenavOpen: boolean = false;
  constructor(private router: Router,){

  }

  enlaces = [{
      routeLink : "listar-doctor",
      icon:"person",
      label: "Listar Doctor",
      rol:"Admin"
    },
    {
      routeLink : "registrar-doctor",
      icon:"",
      label: "Registrar Doctor",
      rol:"Admin"
    },

    {
      routeLink : "listar-citas",
      icon:"",
      label: "Listar Citas",
      rol:"Doctor"
    },

  ]




  irEnlace(routeLink:string){
    this.router.navigate([routeLink])
  }
  // Función para determinar si un enlace está activo
  esEnlaceActivo(routeLink: string): boolean {
    return this.router.isActive(routeLink, false);
  }

  // Cuando se abre el sidenav se oculta el texto con una clase





}
