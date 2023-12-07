import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { DoctorService } from 'src/app/admin/services/doctor.service';
import { CitaService } from 'src/app/client/services/cita.service';
import { Pageable } from 'src/app/core/models/Pageable';

@Component({
  selector: 'app-form-terminar-derivar',
  templateUrl: './form-terminar-derivar.component.html',
  styleUrls: ['./form-terminar-derivar.component.scss']
})
export class FormTerminarDerivarComponent {

  form!: FormGroup;
  citaMascota:any
  hours: { valor: number; disabled: boolean }[] = Array.from({ length: 12 }, (_, i) => ({
    valor: i + 8,
    disabled: false
  }));
  // minutes: number[] = Array.from({ length: 12 }, (_, i) => i * 5); // 0 a 59
  amPmOptions: string[] = ['AM', 'PM'];
  especialidades:any[]=[]
  doctores:any []=[]
  doctor:any

  formControlHora = new FormControl({ value: '8', disabled: true });
  formControl = new FormControl({ value: 'AM', disabled: true });

  pageable: Pageable = {
    page: 0,
    size: 10,
    orderParameter: 'Cita.fecha',
    typeOrder: 'ASC',
  };


  constructor( private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormTerminarDerivarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceDoctor:DoctorService, private citaService:CitaService
  ) {
    this.citaMascota = data.cita_mascota
    console.log(data)


    this.form = this.fb.group({
      observaciones: ['', Validators.required],
      fecha_cita: ['', Validators.required],
      hora: [3, Validators.required],
      minuto: [55, Validators.required],
      // amPm: ['AM',],
      especialidad:[""],
      doctores:[""]
    });
    this.traerEspecialidades()
  }

  async traerEspecialidades(){
    this.especialidades =  await lastValueFrom(this.serviceDoctor.listaEspecialidades())
    this.especialidades = this.especialidades.filter(esp => {
      return esp.descripcion !== "Medicina General";
    });
  }

  async traerDoctoresPorEspecialidad(id_especialidad:number){
    this.doctores =  await lastValueFrom(this.serviceDoctor.listaDoctoresPorEspecialidad(id_especialidad))

    this.doctores = this.doctores.filter(d => d.estado =="activo")
    console.log(this.doctores)
  }

  elegirDoctor(doctor:any){
    this.doctor = doctor


  }

  elegirHora(hora:any){
    console.log(hora)
    if(!hora.disabled){
      hora.valor>=12?this.formControl.setValue('PM'):this.formControl.setValue('AM');
      this.hora_cita = hora.valor
    }

  }
  hora_cita =0
  async traerHorarioDoctor(doctor:any){
    const citasDoctor = await lastValueFrom(this.citaService.listarCitasPorDoctor(this.pageable,doctor.id_doctor))
    console.log(citasDoctor.content)

    for(let cd of citasDoctor.content){
      console.log(cd.cita.hora_cita)
      console.log(cd.cita.fecha)
      for(let h of this.hours){

        if(cd.cita.hora_cita == h.valor && this.fecha_cita== cd.cita.fecha){
          h.disabled = true
        }
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  submitForm(){

    console.log(this.data.cita_mascota)
    console.log(this.hora_cita)
    if(this.data.tipo =="Derivar"){
      this.data.cita_mascota.cita.observaciones =  this.data.cita_mascota.cita.observaciones+" <br> " +this.form.get('observaciones')?.value
      this.data.cita_mascota.cita.estado = 1
      this.citaService.agregarObservacionCita(this.data.cita_mascota).subscribe(response=>{
        this.data.cita_mascota.id_cita_mascota = 0
        this.data.cita_mascota.cita.id_cita = 0
        this.data.cita_mascota.cita.estado = 2
        this.data.cita_mascota.cita.doctor.id_doctor = this.doctor.id_doctor
        let nombreDoctorPrinc = this.data.cita_mascota.cita.doctor.usuario.nombre + " "
                                  + this.data.cita_mascota.cita.doctor.usuario.apellido_paterno+ " "
                                  + this.data.cita_mascota.cita.doctor.usuario.apellido_materno + " ("+ this.data.cita_mascota.cita.doctor.especialidad.descripcion+")"
        let obs = "Dr. "+ nombreDoctorPrinc.replace(/\b\w/g, (letra) => letra.toUpperCase())+ ": "+this.data.cita_mascota.cita.observaciones
        this.data.cita_mascota.cita.observaciones = obs
        console.log(this.data.cita_mascota)

        this.data.cita_mascota.cita.fecha = this.fecha_cita
        this.data.cita_mascota.cita.hora_cita = this.hora_cita
        this.citaService.registrarCita(this.data.cita_mascota).subscribe(response =>{
          this.dialogRef.close(true);
        })
      });
    }else{
      let nombreDoctorPrinc = ("Dr. "+this.data.cita_mascota.cita.doctor.usuario.nombre + " "
                                        + this.data.cita_mascota.cita.doctor.usuario.apellido_paterno+ " "
                                            + this.data.cita_mascota.cita.doctor.usuario.apellido_materno).replace(/\b\w/g, (letra) => letra.toUpperCase())
                                              + " ("+ this.data.cita_mascota.cita.doctor.especialidad.descripcion+")"
      this.data.cita_mascota.cita.observaciones =  this.data.cita_mascota.cita.observaciones+" <br> "+
                                                      nombreDoctorPrinc
                                                          +": "+this.form.get('observaciones')?.value
      this.data.cita_mascota.cita.estado = 1
      this.citaService.agregarObservacionCita(this.data.cita_mascota).subscribe(response=>{
        this.dialogRef.close(true);
      });
    }

  }

  fecha_cita = ""
  formatoFecha(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    this.fecha_cita= `${year}-${month}-${day}`;

  }

  onDateSelected() {
    let fecha  = this.form.get('fecha_cita')?.value
    this.formatoFecha(fecha)
    console.log(this.data.cita_mascota)

    this.traerHorarioDoctor(this.doctor)
    this.formControlHora.enable();
  }
}
