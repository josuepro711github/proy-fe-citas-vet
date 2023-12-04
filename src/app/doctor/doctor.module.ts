import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { ListarComponent } from './citas/listar/listar.component';
import { DoctorComponent } from './doctor.component';
import { SharedModule } from '../core/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InfocitaDoctorComponent } from './citas/infocita-doctor/infocita-doctor.component';


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
    
  ],
})
export class DoctorModule {
  constructor() { }
 }
