import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { ListarComponent } from './citas/listar/listar.component';
import { DoctorComponent } from './doctor.component';


@NgModule({
  declarations: [
    DoctorComponent,
    ListarComponent,
    DoctorComponent
  ],
  imports: [

    CommonModule,
    DoctorRoutingModule
  ],
  exports: [],
  providers: [
    
  ],
})
export class DoctorModule {
  constructor() { }
 }
