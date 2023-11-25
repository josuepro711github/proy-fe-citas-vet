import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent {

  constructor() {}

  ngOnInit(){

  }

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  enlaces = [{
    routeLink : "listar-doctor",
    icon:"person",
    label: "Listar Doctor",
    rol:"Admin"
  },
  {
    routeLink : "registrar-doctor",
    icon:"person_add",
    label: "Registrar Doctor",
    rol:"Admin"
  },

]


  sidenavOpen = true;
  sidenavHeight = "100%";
  sidenavWidth = '256px';
  contentMarginLeft = '256px';
  contentWidth = '80%';
  sidenavAnimation = 'close-in 0.5s ease-out';


  closeSidenav(){
    
    if (this.sidenavOpen) {
      this.sidenavOpen = false;
      this.sidenavWidth = "85px";
      this.contentMarginLeft="85px";
      this.sidenavAnimation = 'close-out 0.5s ease-out';
    } else {
      this.sidenavOpen = true
      this.sidenavOpen = true
      this.sidenavWidth = "256px";
      this.contentMarginLeft="256px";
      this.sidenavAnimation = 'close-in 0.5s ease-out';
    }

  }



  
}
