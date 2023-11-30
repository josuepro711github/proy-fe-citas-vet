import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent {
  constructor() {}

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  enlaces = [
    {
      routeLink: 'cliente-ver-perfil',
      icon: 'person',
      label: 'Mi Perfil',
      rol: 'Cliente',
    },{
      routeLink: 'cliente-listar-citas',
      icon: 'calendar_today',
      label: 'Mi Citas',
      rol: 'Cliente',
    },{
      routeLink: 'cliente-ver-mascota',
      icon: 'pets',
      label: 'Mis Mascotas',
      rol: 'Cliente',
    }
  ];

  sidenavOpen = true;
  sidenavHeight = '100%';
  sidenavWidth = '256px';
  contentMarginLeft = '256px';
  contentWidth = '80%';

  closeSidenav() {
    if (this.sidenavOpen) {
      this.sidenavOpen = false;
      this.sidenavWidth = '85px';
      this.contentMarginLeft = '85px';
    } else {
      this.sidenavOpen = true;
      this.sidenavOpen = true;
      this.sidenavWidth = '256px';
      this.contentMarginLeft = '256px';
    }
  }
}
