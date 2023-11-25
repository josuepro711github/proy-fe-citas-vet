import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent {

  constructor() {}

  ngOnInit(){



  }

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
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
