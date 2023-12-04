import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { ListarComponent } from './citas/listar/listar.component';
import { DoctorComponent } from './doctor.component';
import { SharedModule } from '../core/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InfocitaDoctorComponent } from './citas/infocita-doctor/infocita-doctor.component';
import { AuthService } from '../public/services/auth.service';
import { CitaService } from '../client/services/cita.service';


@NgModule({
  declarations: [
    DoctorComponent,
    ListarComponent,
    InfocitaDoctorComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    DoctorRoutingModule,
    ReactiveFormsModule
  ],
  exports: [],
  providers: [
    AuthService,
    CitaService
  ],
})
export class DoctorModule {
  constructor() { }
 }
