import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { NotFoundComponent } from './components/not-found/not-found.component';
import { MaterialModule } from './material.module';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AlertComponent } from './components/alert/alert.component';
import { DoctorService } from 'src/app/admin/services/doctor.service';


@NgModule({
  imports: [
    HttpClientModule,
    RouterModule,
    MaterialModule,
    CommonModule
  ],
  declarations: [
    NotFoundComponent,
    FooterComponent,
    NavbarComponent,
    SidenavComponent,
    AlertComponent
  ],
  exports: [
    HttpClientModule,
    RouterModule,
    NotFoundComponent,
    MaterialModule,
    FooterComponent,
    NavbarComponent,
    CommonModule,
    SidenavComponent,
    AlertComponent
  ],
  providers: [DoctorService]
})

export class SharedModule {
  constructor() {}
}
