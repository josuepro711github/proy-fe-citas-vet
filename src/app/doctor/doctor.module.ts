import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { ListarComponent } from './citas/listar/listar.component';
import { DoctorComponent } from './doctor.component';
import { SharedModule } from '../core/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DoctorComponent,
    ListarComponent,
    DoctorComponent
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
