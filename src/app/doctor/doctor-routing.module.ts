import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListarComponent } from './citas/listar/listar.component';

const routes: Routes = [
  
    { path: '', redirectTo: 'doctor', pathMatch: 'full' },
      { path: 'listar-citas', component: ListarComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule {

  constructor() { }

 }
