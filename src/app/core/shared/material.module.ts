import { NgModule } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
<<<<<<< HEAD
import {MatDatepickerModule} from '@angular/material/datepicker';
=======
import { MatDatepickerModule } from '@angular/material/datepicker';
>>>>>>> proy-fe-citas-vet_HV
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';


@NgModule({
  imports: [
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
<<<<<<< HEAD
    MatNativeDateModule
=======
    MatNativeDateModule,
>>>>>>> proy-fe-citas-vet_HV
  ],
  exports: [
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
<<<<<<< HEAD
    MatNativeDateModule
=======
    MatNativeDateModule,

>>>>>>> proy-fe-citas-vet_HV
  ],
})

export class MaterialModule {
  constructor() {}
}
