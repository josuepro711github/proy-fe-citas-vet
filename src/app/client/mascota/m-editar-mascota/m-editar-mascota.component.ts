import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MascotaService } from '../../services/mascota.service';
import { lastValueFrom } from 'rxjs';
import { DoctorService } from 'src/app/admin/services/doctor.service';
import { AuthService } from 'src/app/public/services/auth.service';
//import { MascotaService } from '../../services/mascota.service';

@Component({
  selector: 'app-m-editar-mascota',
  templateUrl: './m-editar-mascota.component.html',
  styleUrls: ['./m-editar-mascota.component.scss']
})
export class MEditarMascotaComponent {
  fecha_nacimiento = ""

  isFormRegisted : boolean = true;
  title: string = "Registre";


  form!: FormGroup ;
  mascota:any = null;

  razas:any[]=[]
  especies:any[]=[]
  usuarioLogueado:any
  imagenFile: File | null = null;

  ngOnInit(): void {
    if(this.mascota != null){
      this.isFormRegisted = false;
      this.title = "Edite"
      this.form = this.fb.group({
        alias: [this.mascota.alias, Validators.required],
        genero: [new FormControl(''), Validators.required],
        fecha_nacimiento: [this.mascota.fecha_nacimiento, Validators.required],
        imagen:[''],
        raza:  new FormControl(''),
        especie:  new FormControl('')
      })

      this.mascotaService.listaEspecies().subscribe(response=>{
        this.especies = response
        const especieMasc = this.especies.find(especie => especie.descripcion.toUpperCase() === this.mascota.raza.especie.descripcion.toUpperCase());
        console.log(especieMasc)
        if (especieMasc) {
          this.form.get('especie')?.setValue(especieMasc);
        }

      })

      this.mascotaService.listarRazasPorEspecie(this.mascota.raza.especie.id_especie).subscribe(response=>{
        this.razas = response
        const razaMasc = this.razas.find(raza => raza.descripcion.toUpperCase() === this.mascota.raza.descripcion.toUpperCase());
        console.log(razaMasc)
        if (razaMasc) {
          this.form.get('raza')?.setValue(razaMasc);
        }
      })
      console.log(this.mascota.genero)
      const generoMasc = this.genero.find(gen => gen.toUpperCase() === this.mascota.genero.toUpperCase());
      console.log(generoMasc)
      if (generoMasc) {
        this.form.get('genero')?.setValue(generoMasc);
      }

      this.fecha_nacimiento = this.mascota.fecha_nacimiento
      this.traerImagenMascota()

      // this.form.get('especie')?.setValue(this.mascota.raza.especie);
      // console.log(this.form.get('especie')?.value)
      // const especieControl = this.form.get('especie') as FormControl;
      // console.log(this.mascota.raza.especie)
      // especieControl.setValue(this.mascota.raza.especie);

    } else {
      this.title = "Registre";
      this.isFormRegisted = true;
      this.form = this.fb.group({
        alias: ['', Validators.required],
        genero: ['', Validators.required],
        fecha_nacimiento: ['', Validators.required],
        imagen:[''],
        raza: [''],
        especie: ['']
      })
    }


  }

  async traerImagenMascota(){
    try {
      const response = await lastValueFrom(
        this.mascotaService.traerImagenMascota(
          this.mascota.imagen
        )
      );
      const reader = new FileReader();
      //aqui↓
      this.imagenFile = new File(
        [response],
        this.mascota.imagen,
        { type: response.type }
      );
      reader.onload = () => {
        this.imagenSeleccionada = reader.result;
      };
      reader.readAsDataURL(response);
    } catch (e) {
      console.log(e);
    }
  }
  genero:string[] = ['Macho','Hembra']

  constructor (private fb: FormBuilder, public dialogRef: MatDialogRef<MEditarMascotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private mascotaService:MascotaService,private serviceDoctor:DoctorService,
    private authService:AuthService,
    //private mascotaService:MascotaService
    ){
      this.mascota = this.data
      console.log("Data: ", data)
      this.usuarioLogueado = this.authService.obtenerToken()
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
      if ( this.title == 'Edite') {
        this.mascota.imagen = 'cambiado';
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
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

  registrarMascota(){
    if(!this.form.valid){
      return
    }

    let alias  = this.form.get('alias')?.value
    let genero  = this.form.get('genero')?.value

    let raza  = this.form.get('raza')?.value
    console.log(raza)
    let especie  = this.form.get('especie')?.value

    let mascota = {
      id_mascota: 0,
      alias:alias,
      genero:genero,
      fecha_nacimiento:this.fecha_nacimiento,
      imagen:"...",
      raza:{
        id_raza:raza.id_raza,
        descripcion:"....",
        especie:{
          id_especie:especie.id_especie,
          descripcion:"...."
        }
      },
      cliente:{
        id_cliente:this.usuarioLogueado.id_cliente,
      }
    }
    console.log(mascota)
    this.mascotaService.registrarMascota(mascota,this.imagenFile).subscribe(response=>{
      this.dialogRef.close();
    })

  }

  editarMascota(){

    if(!this.form.valid){
      return
    }

    let alias  = this.form.get('alias')?.value
    let genero  = this.form.get('genero')?.value

    let raza  = this.form.get('raza')?.value
    console.log(raza)
    let especie  = this.form.get('especie')?.value

    let mascota = {
      id_mascota: this.mascota.id_mascota,
      alias:alias,
      genero:genero,
      fecha_nacimiento:this.fecha_nacimiento,
      imagen:this.mascota.imagen,
      raza:{
        id_raza:raza.id_raza,
        descripcion:"....",
        especie:{
          id_especie:especie.id_especie,
          descripcion:"...."
        }
      },
      cliente:{
        id_cliente:this.usuarioLogueado.id_cliente,
      }
    }

    this.mascotaService.actualizarMascota(mascota,this.imagenFile).subscribe(response=>{
      this.dialogRef.close();
    })
  }



  async traerRazasPorEspecie(id_especie:number){
    this.razas = await lastValueFrom(this.mascotaService.listarRazasPorEspecie(id_especie))
    console.log(this.razas)

  }


}
