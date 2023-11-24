import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListarComponent } from './doctor/listar/listar.component';
import { RegistrarActualizarComponent } from './doctor/registrar-actualizar/registrar-actualizar.component';

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminComponent,
    ListarComponent,
    RegistrarActualizarComponent,
  ],
  exports: [],
  providers: [],
})
export class AdminModule {
  constructor() {}
}