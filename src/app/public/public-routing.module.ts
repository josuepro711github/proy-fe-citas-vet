import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PublicComponent } from "./public.component";
import { HomeComponent } from "./home/containers/home.component";
import { NosotrosComponent } from "./nosotros/containers/nosotros.component";
import { ServiciosComponent } from "./servicios/containers/servicios.component";
import { BlogComponent } from "./blog/containers/blog.component";
import { ConsultoriosComponent } from "./consultorios/containers/consultorios.component";
import { PedirCitaComponent } from "./pedir-cita/containers/pedir-cita.component";
import { LoginRegistroComponent } from "./login-registro/containers/login-registro.component";

const routes: Routes = [
    { 
        path: '', component: PublicComponent, children:
        [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'pedir-cita', component: PedirCitaComponent },
            { path: 'nosotros', component: NosotrosComponent },
            { path: 'servicios', component: ServiciosComponent },
            { path: 'consultorios', component: ConsultoriosComponent },
            { path: 'blog', component: BlogComponent },
            { path: 'login-registro', component: LoginRegistroComponent }

        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class PublicRoutingModule {
    constructor() {}
}