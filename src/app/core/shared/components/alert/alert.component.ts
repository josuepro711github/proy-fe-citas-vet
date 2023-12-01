import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { DoctorService } from 'src/app/admin/services/doctor.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  alerta:any
  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceDoctor:DoctorService
  ) {
    this.alerta = data
    console.log(data)
  }

  async eliminarDoctor(){
    let doctorEliminado = await lastValueFrom(this.serviceDoctor.eliminarDoctor(this.alerta.idDoctor));
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
