import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared/shared.module';
import { DoctoresComponent } from './doctores/doctores.component';
import { CitasComponent } from './citas/citas.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminComponent,
    DoctoresComponent,
    CitasComponent
  ],
  exports: [],
  providers: [],
})
export class AdminModule {
  constructor() {}
}
