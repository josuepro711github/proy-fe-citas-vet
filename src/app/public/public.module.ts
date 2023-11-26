import { NgModule } from "@angular/core";
import { PublicRoutingModule } from "./public-routing.module";
import { SharedModule } from "../core/shared/shared.module";
import { PublicComponent } from "./public.component";
import { HomeComponent } from "./home/containers/home.component";
import { CardDoctorComponent } from './home/components/card-doctor/card-doctor.component';
import { NosotrosComponent } from './nosotros/containers/nosotros.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ServiciosComponent } from './servicios/containers/servicios.component';
import { BlogComponent } from "./blog/containers/blog.component";
import { ConsultoriosComponent } from "./consultorios/containers/consultorios.component";
import { AuthService } from "./services/auth.service";
import { PedirCitaComponent } from './pedir-cita/containers/pedir-cita.component';
import { LoginRegistroComponent } from './login-registro/containers/login-registro.component';

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
        BlogComponent,
        ConsultoriosComponent,
        PedirCitaComponent,
        LoginRegistroComponent
    ],
    exports: [],
    providers: [
        AuthService
    ]
})

export class PublicModule {
    constructor() { }
}
