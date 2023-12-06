import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
//import { MascotaService } from '../../services/mascota.service';

@Component({
  selector: 'app-m-editar-mascota',
  templateUrl: './m-editar-mascota.component.html',
  styleUrls: ['./m-editar-mascota.component.scss']
})
export class MEditarMascotaComponent {
  fecha_nacimiento = ""

  form!: FormGroup ;
  mascota:any = null;

  razas:any[]=[]
  especies:any[]=[]
  usuarioLogueado:any
  imagenFile: File | null = null;

  ngOnInit(): void {
    if(this.mascota != null){
      this.form = this.fb.group({
        alias: [this.mascota.alias, Validators.required],
        genero: [this.mascota.genero, Validators.required],
        fecha_nacimiento: [this.mascota.fecha_nacimiento, Validators.required],
        imagen:[''],
        raza: [this.mascota.raza],
        especie: [this.mascota.especie]
      })
    } else {
      this.form = this.fb.group({
        alias: ['', Validators.required],
        genero: ['', Validators.required],
        fecha_nacimiento: ['', Validators.required],
        imagen:[''],
        raza: [''],
        especie: ['']
      })
    }
    
    this.traerEspecies()
  }

  genero:string[] = ['Macho','Hembra']

  constructor (private fb: FormBuilder, public dialogRef: MatDialogRef<MEditarMascotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    //private authService:AuthService,
    //private mascotaService:MascotaService
    ){
      this.mascota = this.data
      console.log("Data: ", data)
      //this.usuarioLogueado = this.authService.obtenerToken()
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

  agregarMascota(){
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
    // this.mascotaService.registrarMascota(mascota,this.imagenFile).subscribe(response=>{
    //   this.dialogRef.close();
    // })

  }

  async traerEspecies(){

    // this.especies = await lastValueFrom(this.mascotaService.listaEspecies())
    // console.log(this.especies)
  }

  async traerRazasPorEspecie(id_especie:number){
    // this.razas = await lastValueFrom(this.mascotaService.listarRazasPorEspecie(id_especie))
    // console.log(this.razas)

  }


}
