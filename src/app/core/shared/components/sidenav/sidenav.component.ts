import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

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

  ]


  irEnlace(routeLink:string){
    this.router.navigate([routeLink])
  }
}
