import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CitasComponent } from './citas/citas.component';
import { SharedModule } from '../core/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MascotaComponent } from './mascota/mascota.component';


@NgModule({
  declarations: [
    ClientComponent,
    PerfilComponent,
    CitasComponent,
    MascotaComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule
  ]
})
export class ClientModule { }
