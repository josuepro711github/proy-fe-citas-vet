import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalMascotaComponent } from '../modal-mascota/modal-mascota.component';
import { MascotaService } from 'src/app/client/services/mascota.service';
import { lastValueFrom } from 'rxjs';
import { Pageable } from 'src/app/core/models/Pageable';
import { AuthService } from '../../services/auth.service';
import { CitaService } from 'src/app/client/services/cita.service';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/admin/services/doctor.service';

@Component({
  selector: 'app-pedir-cita',
  templateUrl: './pedir-cita.component.html',
  styleUrls: ['./pedir-cita.component.scss']
})
export class PedirCitaComponent {

  form!: FormGroup;
  tipo_form = "Registrar"
  fecha_cita = ""
  mascota:any

  hours: { valor: number; disabled: boolean }[] = Array.from({ length: 12 }, (_, i) => ({
    valor: i + 8,
    disabled: false
  }));
  // minutes: number[] = Array.from({ length: 12 }, (_, i) => i * 5); // 0 a 59
  amPmOptions: string[] = ['AM', 'PM'];

  formControlHora = new FormControl({ value: '8', disabled: true });
  formControl = new FormControl({ value: 'AM', disabled: true });

  mascotas: any[] = []
  doctor:any
  pageable: Pageable = {
    page: 0,
    size: 10,
    orderParameter: 'cliente',
    typeOrder: '',
  };

  userLogueado:any
  constructor(private fb: FormBuilder,public dialog: MatDialog,private mascotaService:MascotaService,private doctorService:DoctorService,
    private authService:AuthService,private citaService:CitaService, private router: Router,) {
    this.userLogueado = this.authService.obtenerToken()
  }

  hora_cita = 0
  elegirHora(hora:any){
    console.log(hora)
    if(!hora.disabled){
      hora.valor>=12?this.formControl.setValue('PM'):this.formControl.setValue('AM');
      this.hora_cita = hora.valor
    }
  }

  async traerHorarioDoctor(doctor:any){
    this.refrescarHoras()
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
  refrescarHoras(){
    for(let h of this.hours){
      h.disabled = false
    }
  }
  ngOnInit() {
    this.form = this.fb.group({
      fecha_cita: ['', Validators.required],
      motivo: ['', Validators.required],
      nombrePaciente: [''],
      mascota: [''],
      hora: [3, Validators.required],
      // minuto: [55, Validators.required],
      amPm: ['AM']
    });

    this.traerMascotas()
    this.traerDoctores()

  }

  async traerMascotas(){
    console.log(this.userLogueado)
    let pag:Pageable = {
      page:0,
      size:10,
      orderParameter:"cliente",
      typeOrder:""
    }
    const response = await lastValueFrom(this.mascotaService.listarMascotas(this.userLogueado.id_cliente,pag))
    console.log(response)
    this.mascotas = response.content
  }

  async traerDoctores(){
    const response = await lastValueFrom(this.doctorService.listar(this.pageable))
    const doctores:any[] = response.content
    console.log(doctores)
    this.doctor = doctores.filter(doctor => doctor.especialidad.descripcion.toUpperCase() === 'MEDICINA GENERAL');
    console.log(this.doctor[0])
    this.pageable.orderParameter = "cita.fecha"


  }

  agregarMascota() {
    // Lógica para agregar una nueva mascota
    console.log(12121212)
    const dialogRef = this.dialog.open(ModalMascotaComponent,
      {
        // width: '500px',
        width: '60%',

      });

      dialogRef.afterClosed().subscribe(result => {
        this.traerMascotas()

      });
    console.log('Agregar mascota:', this.form.value.mascota);
  }

  seleccionarMascota(mascota:any){
    this.mascota = mascota
  }


  submitForm() {
    console.log("asdasgaaaaaaaaaa")
    if (!this.form.valid) {
      // Aquí puedes enviar la información al servidor o realizar otras acciones
      console.log(this.form.value);
      return
    }

    let motivo  = this.form.get('motivo')?.value

    let cita = {
      id_cita_mascota: 0,
      mascota:{
        id_mascota:this.mascota.id_mascota,
      },
      cita:{
        id_cita:0,
        fecha:this.fecha_cita,
        motivo:motivo,
        hora_cita:this.hora_cita,
        observaciones:" ",
        estado:"0",
        doctor:{
          id_doctor:this.doctor[0].id_doctor
        }
      },
    }
    console.log(cita)

    this.citaService.registrarCita(cita).subscribe(response=>{
      this.router.navigate(['cliente-listar-citas']);
    })

  }

  validFormName(val: string): boolean {
    let esInvalido = false;
    if (this.form.get(val)?.invalid && this.form.get(val)?.touched) {
      esInvalido = true;
    }
    return esInvalido;
  }

  validHasError(val: string): number {
    let error = 0;
    if (this.form.get(val)?.hasError('required')) {
      error = 1;
    }
    if (this.form.get(val)?.hasError('email')) {
      error = 2;
    }
    return error;
  }
  formatoFecha(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    this.fecha_cita= `${year}-${month}-${day}`;

  }

  onDateSelected() {
    let fecha  = this.form.get('fecha_cita')?.value
    this.formatoFecha(fecha)
    this.traerHorarioDoctor(this.doctor[0])
    this.formControlHora.enable();
  }
}
