import { NgModule } from "@angular/core";
import { PublicRoutingModule } from "./public-routing.module";
import { SharedModule } from "../core/shared/shared.module";
import { PublicComponent } from "./public.component";
import { LoginComponent } from './login/containers/login.component';
import { HomeComponent } from "./home/containers/home.component";
import { CardDoctorComponent } from './home/components/card-doctor/card-doctor.component';
import { NosotrosComponent } from './nosotros/containers/nosotros.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ContactoComponent } from './contacto/containers/contacto.component';
import { ServiciosComponent } from './servicios/containers/servicios.component';
import { BlogComponent } from "./blog/containers/blog.component";
import { ConsultoriosComponent } from "./consultorios/containers/consultorios.component";

@NgModule({
    imports: [
        PublicRoutingModule,
        SharedModule,
        ReactiveFormsModule,
    ],
    declarations: [
        PublicComponent,
        LoginComponent,
        HomeComponent,
        CardDoctorComponent,
        NosotrosComponent,
        ContactoComponent,
        ServiciosComponent,
        BlogComponent,
        ConsultoriosComponent
    ],
    exports: [],
    providers: []
})

export class PublicModule {
    constructor() { }
}
