import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CitasComponent } from './citas/citas.component';
import { SharedModule } from '../core/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MascotaComponent } from './mascota/mascota.component';
import { InfocitaClienteComponent } from './citas/infocita-cliente/infocita-cliente.component';
import { CitaService } from './services/cita.service';
import { AuthService } from '../public/services/auth.service';
import { MEditarMascotaComponent } from './mascota/m-editar-mascota/m-editar-mascota.component';
import { MascotaService } from './services/mascota.service';



@NgModule({
  declarations: [
    ClientComponent,
    PerfilComponent,
    CitasComponent,
    MascotaComponent,
    InfocitaClienteComponent,
    MEditarMascotaComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule
  ],providers:[
    CitaService,AuthService,MascotaService
  ]
})
export class ClientModule { }
