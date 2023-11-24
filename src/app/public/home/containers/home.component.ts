import { Component, OnInit } from '@angular/core';
import { doctorData } from 'src/app/core/models/DoctorData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  listaDoctor =  doctorData;

  ngOnInit(): void {
  }


}
