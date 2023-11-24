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
