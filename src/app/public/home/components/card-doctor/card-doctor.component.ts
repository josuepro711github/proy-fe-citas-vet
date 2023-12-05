import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { DoctorService } from 'src/app/admin/services/doctor.service';
import { Doctor } from 'src/app/core/models/Doctor';
import { Pageable } from 'src/app/core/models/Pageable';


@Component({
  selector: 'app-card-doctor',
  templateUrl: './card-doctor.component.html',
  styleUrls: ['./card-doctor.component.scss']
})
export class CardDoctorComponent implements OnInit{

  @Input() listaDoctor!: Doctor[];

  doctores:any[]=[]

  pageable: Pageable = {
    page: 0,
    size: 100,
    orderParameter: '',
    typeOrder: '',
  };

  constructor(private doctorService:DoctorService){}

  ngOnInit(): void {
    this.traerDoctores()
  }

  async traerDoctores(){
    const listaDoctorPag = await lastValueFrom(this.doctorService.listar(this.pageable))
    this.doctores = listaDoctorPag.content
    console.log(this.doctores)
  }

}
