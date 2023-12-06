import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  hours: number[] = Array.from({ length: 12 }, (_, i) => i + 1); // 1 a 12
  minutes: number[] = Array.from({ length: 12 }, (_, i) => i * 5); // 0 a 59
  amPmOptions: string[] = ['AM', 'PM'];

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

  ngOnInit() {
    this.form = this.fb.group({
      fecha_cita: ['', Validators.required],
      motivo: ['', Validators.required],
      nombrePaciente: [''],
      mascota: [''],
      hora: [3, Validators.required],
      minuto: [55, Validators.required],
      amPm: ['AM']
    });

    this.traerMascotas()
    this.traerDoctores()

  }

  async traerMascotas(){
    const response = await lastValueFrom(this.mascotaService.listarMascotas(this.userLogueado.id_cliente,this.pageable))
    console.log(response)
    this.mascotas = response.content
  }

  async traerDoctores(){
    const response = await lastValueFrom(this.doctorService.listar(this.pageable))
    const doctores:any[] = response.content
    console.log(doctores)
    this.doctor = doctores.filter(doctor => doctor.especialidad.descripcion.toUpperCase() === 'MEDICINA GENERAL')[0];
    console.log(this.doctor.id_doctor)

  }

  agregarMascota() {
    // Lógica para agregar una nueva mascota

    const dialogRef = this.dialog.open(ModalMascotaComponent,
      {
        // width: '500px',
        width: '60%',
        data: {
          title: 'Registrar',
          mascota: null
        }

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

    if (this.form.valid) {
      // Aquí puedes enviar la información al servidor o realizar otras acciones
      console.log(this.form.value);
    }

    let motivo  = this.form.get('motivo')?.value

    let hora  = this.form.get('hora')?.value +":"+this.form.get('minuto')?.value



    let cita = {
      id_cita_mascota: 0,
      mascota:{
        id_mascota:this.mascota.id_mascota,
      },
      cita:{
        id_cita:0,
        fecha:this.fecha_cita,
        motivo:motivo,
        hora_cita:hora,
        observaciones:".",
        estado:"0",
        doctor:{
          id_doctor:this.doctor.id_doctor
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
  }
}
