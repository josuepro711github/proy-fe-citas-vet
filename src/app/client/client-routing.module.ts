import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { CitasComponent } from './citas/citas.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  
  {
     path: '', component: ClientComponent,
     children: [
      { path: '', redirectTo: 'cliente', pathMatch: 'full' },
      { path: 'cliente-listar-citas', component: CitasComponent },
      { path: 'cliente-ver-perfil', component: PerfilComponent },
     ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
