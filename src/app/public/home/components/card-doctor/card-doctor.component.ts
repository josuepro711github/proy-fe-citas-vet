import { Component, Input, OnInit } from '@angular/core';
import { Doctor } from 'src/app/core/models/Doctor';

@Component({
  selector: 'app-card-doctor',
  templateUrl: './card-doctor.component.html',
  styleUrls: ['./card-doctor.component.scss']
})
export class CardDoctorComponent implements OnInit{

  @Input() listaDoctor!: Doctor[];


  ngOnInit(): void {
    console.log('lista recibida: ', this.listaDoctor);
  }

}
