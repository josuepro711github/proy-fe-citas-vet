import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent {

  constructor() {

  }


  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  enlaces = [{
    routeLink : "listar-citas",
    icon:"person",
    label: "Listar Citas",
    rol:"Doctor"
  }

]

  sidenavOpen = true;
  sidenavHeight = "100%";
  sidenavWidth = '256px';
  contentMarginLeft = '256px';
  contentWidth = '80%';


  closeSidenav(){
    
    if (this.sidenavOpen) {
      this.sidenavOpen = false;
      this.sidenavWidth = "85px";
      this.contentMarginLeft="85px";
      
    } else {
      this.sidenavOpen = true
      this.sidenavOpen = true
      this.sidenavWidth = "256px";
      this.contentMarginLeft="256px";
      
    }
    


  }



}
