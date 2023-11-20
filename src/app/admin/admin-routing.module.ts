import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { CitasComponent } from "./citas/citas.component";
import { DoctoresComponent } from "./doctores/doctores.component";


const routes: Routes = [
    { 
        path: '', component: AdminComponent, children:
        [
            { path: '', redirectTo: 'admin', pathMatch: 'full' },
            { path: 'citas', component: CitasComponent },
            { path: 'doctores', component: DoctoresComponent }
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