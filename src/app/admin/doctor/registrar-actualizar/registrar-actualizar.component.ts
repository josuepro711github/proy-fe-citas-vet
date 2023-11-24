import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitterService } from 'src/app/core/shared/services/event-emitter.service';
import { DoctorService } from '../doctor.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-registrar-actualizar',
  templateUrl: './registrar-actualizar.component.html',
  styleUrls: ['./registrar-actualizar.component.scss']
})
export class RegistrarActualizarComponent {


  form!: FormGroup;


  imagenFile: File | null = null;
  fecha_nacimiento = ""

  especialidades:any[] =[]
  tipo_form = "Registrar"
  doctorActualizar:any
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventEmitterService: EventEmitterService,
     private serviceDoctor: DoctorService,
     private activatedRoute:ActivatedRoute
    ) {

      this.activatedRoute.params.subscribe(params =>{
        let idDoctor = params['idDoctor']
        if(idDoctor){
          this.tipo_form = "Actualizar"
          this.buscarDoctor(idDoctor)
        }
      });
    }

    async traerEspecialidades(){
      this.especialidades =  await lastValueFrom(this.serviceDoctor.listaEspecialidades())
      if(this.tipo_form == "Actualizar"){
        const especialidadControl = this.form.get('especialidad') as FormControl;
        const especialidadSeleccionada= this.especialidades.find(es => es.descripcion === this.doctorActualizar.especialidad.descripcion);
        console.log(especialidadSeleccionada)
        if (especialidadSeleccionada) {
          especialidadControl.setValue(especialidadSeleccionada);
        }
      }
    }

    async buscarDoctor(idDoctor:number){
      this.doctorActualizar = await lastValueFrom(this.serviceDoctor.buscarDoctor(idDoctor))
      this.form.get('email')?.setValue(this.doctorActualizar.usuario.email);
      this.form.get('nombres')?.setValue(this.doctorActualizar.usuario.nombre);
      this.form.get('apellido_paterno')?.setValue(this.doctorActualizar.usuario.apellido_paterno);
      this.form.get('apellido_materno')?.setValue(this.doctorActualizar.usuario.apellido_materno);
      this.form.get('dni')?.setValue(this.doctorActualizar.usuario.dni);
      this.form.get('telefono')?.setValue(this.doctorActualizar.usuario.telefono);

      this.form.get('password')?.setValue("****");
      this.form.get('fecha_nacimiento')?.setValue(this.doctorActualizar.usuario.fecha_nacimiento);
      this.fecha_nacimiento =this.doctorActualizar.usuario.fecha_nacimiento

      try{
        const response = await lastValueFrom(this.serviceDoctor.traerImagegnDoctor(this.doctorActualizar.usuario.imagen))
        const reader = new FileReader();
        reader.onload = () => {
          this.imagenSeleccionada = reader.result;
        };
        reader.readAsDataURL(response);
      }catch(e){
        console.log(e)
      }

    }

    ngOnInit(): void {
      this.traerEspecialidades()
      this.form = this.fb.group({
        //Login
        email: ['', [Validators.email, Validators.required]],
        password: ['', Validators.required],

        //Registro
        nombres: ['', Validators.required],
        apellido_paterno: ['', Validators.required],
        apellido_materno: ['', Validators.required],
        fecha_nacimiento: ['', Validators.required],
        dni: ['', Validators.required],
        telefono: ['', Validators.required],
        imagen: [''],
        especialidad:['']
      });


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

  executeForm() {
    if(!this.form.valid){
      return
    }
    console.log(this.form.get('especialidad')?.value)
    console.log(this.tipo_form)

    let email  = this.form.get('email')?.value
    let contrasenia  = this.form.get('password')?.value
    let nombre  = this.form.get('nombres')?.value
    let apellido_paterno  = this.form.get('apellido_paterno')?.value
    let apellido_materno  = this.form.get('apellido_materno')?.value
    let dni  = this.form.get('dni')?.value
    let telefono  = this.form.get('telefono')?.value

    let doctor = {
      id_doctor: 0,
      usuario:{
        id_usuario: 0, email: email, contrasenia:contrasenia,nombre:nombre,apellido_paterno:apellido_paterno,
        apellido_materno:apellido_materno,dni:dni,fecha_nacimiento:this.fecha_nacimiento,telefono:telefono,imagen:this.doctorActualizar.usuario.imagen,rol:{
          id_rol:2,
          tipo_rol:"DOCTOR"
        }},
        especialidad:this.form.get('especialidad')?.value
    }

    if(this.tipo_form == "Registrar"){
      this.serviceDoctor.registrarDoctor(doctor,this.imagenFile).subscribe(response=>{
        this.router.navigate(['listar-doctor']);
      })
    }else{
      doctor.id_doctor = this.doctorActualizar.id_doctor
      doctor.usuario.id_usuario = this.doctorActualizar.usuario.id_usuario
      console.log(doctor)
      this.serviceDoctor.actualizarDoctor(doctor,this.imagenFile).subscribe(response=>{
        this.router.navigate(['listar-doctor']);
      })
    }
  }


  imagenSeleccionada: string | ArrayBuffer | null = null;
  imagenFileSeleccionado(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.imagenFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenSeleccionada = reader.result;

      };
      reader.readAsDataURL(file);
      if(this.tipo_form=="Actualizar"){
        this.doctorActualizar.usuario.imagen = "cambiado"
      }

    }
  }

  onDateSelected() {
    let fecha_nacimiento  = this.form.get('fecha_nacimiento')?.value
    this.formatoFecha(fecha_nacimiento)
  }

  formatoFecha(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    this.fecha_nacimiento= `${year}-${month}-${day}`;

  }

}
