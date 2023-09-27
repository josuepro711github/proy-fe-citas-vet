import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PublicComponent } from "./public.component";
import { LoginComponent } from "./login/containers/login.component";
import { HomeComponent } from "./home/containers/home.component";
import { NosotrosComponent } from "./nosotros/containers/nosotros.component";
import { ContactoComponent } from "./contacto/containers/contacto.component";
import { ServiciosComponent } from "./servicios/containers/servicios.component";
import { BlogComponent } from "./blog/containers/blog.component";
import { ConsultoriosComponent } from "./consultorios/containers/consultorios.component";

const routes: Routes = [
    { 
        path: '', component: PublicComponent, children:
        [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'contacto', component: ContactoComponent },
            { path: 'nosotros', component: NosotrosComponent },
            { path: 'servicios', component: ServiciosComponent },
            { path: 'consultorios', component: ConsultoriosComponent },
            { path: 'blog', component: BlogComponent },
            { path: 'login-registro', component: LoginComponent }

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