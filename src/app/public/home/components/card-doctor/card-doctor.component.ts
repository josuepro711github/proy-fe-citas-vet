import { Component, Input, OnInit } from '@angular/core';
import { DoctorInterface } from 'src/app/core/models/Doctor';

@Component({
  selector: 'app-card-doctor',
  templateUrl: './card-doctor.component.html',
  styleUrls: ['./card-doctor.component.scss']
})
export class CardDoctorComponent implements OnInit{

  @Input() listaDoctor!: DoctorInterface[];


  ngOnInit(): void {
    console.log('lista recibida: ', this.listaDoctor);
  }

}
