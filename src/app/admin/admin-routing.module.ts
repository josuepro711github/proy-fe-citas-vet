import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { ListarComponent } from "./doctor/listar/listar.component";
import { RegistrarActualizarComponent } from "./doctor/registrar-actualizar/registrar-actualizar.component";


const routes: Routes = [
    {
        path: '', component: AdminComponent, children:
        [
            { path: '', redirectTo: 'admin', pathMatch: 'full' },
            { path: 'listar-doctor', component: ListarComponent },
            { path: 'registrar-doctor', component: RegistrarActualizarComponent },
            { path: 'actualizar-doctor/:idDoctor', component: RegistrarActualizarComponent }
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

export class AdminRoutingModule {
    constructor() {}
}
