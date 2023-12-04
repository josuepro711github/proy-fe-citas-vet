import { NgModule } from "@angular/core";
import { PublicRoutingModule } from "./public-routing.module";
import { SharedModule } from "../core/shared/shared.module";
import { PublicComponent } from "./public.component";
import { HomeComponent } from "./home/containers/home.component";
import { CardDoctorComponent } from './home/components/card-doctor/card-doctor.component';
import { NosotrosComponent } from './nosotros/containers/nosotros.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ServiciosComponent } from './servicios/containers/servicios.component';
import { ConsultoriosComponent } from "./consultorios/containers/consultorios.component";
import { AuthService } from "./services/auth.service";
import { PedirCitaComponent } from './pedir-cita/containers/pedir-cita.component';
import { LoginRegistroComponent } from './login-registro/containers/login-registro.component';
import { ModalMascotaComponent } from './pedir-cita/modal-mascota/modal-mascota.component';
import { DoctorService } from "../admin/services/doctor.service";
import { CitaService } from "../client/services/cita.service";
import { MascotaService } from "../client/services/mascota.service";

@NgModule({
    imports: [
        PublicRoutingModule,
        SharedModule,
        ReactiveFormsModule,
    ],
    declarations: [
        PublicComponent,
        HomeComponent,
        CardDoctorComponent,
        NosotrosComponent,
        PedirCitaComponent,
        ServiciosComponent,
        ConsultoriosComponent,
        PedirCitaComponent,
        LoginRegistroComponent,
        ModalMascotaComponent
    ],
    exports: [],
    providers: [
        AuthService,
        DoctorService,
        CitaService,
        MascotaService
    ]
})

export class PublicModule {
    constructor() { }
}
