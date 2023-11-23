import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent {

  constructor() {}

  ngOnInit(){}

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  sidenavOpen = true;
  sidenavHeight = "100%";
  sidenavWidth = '20%';
  contentMarginLeft = '20%';
  contentWidth = '80%';

  closeSidenav(){
    this.sidenavWidth = "10%";
    this.contentMarginLeft="10%"
    this.sidenavOpen = false
  }

  closeOpenSidenav() {
    this.sidenavOpen = true
   this.sidenavWidth = "20%";
   this.contentMarginLeft="20%"
    
  }
}
