import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { DialogModalComponent } from '../dialog-modal/dialog-modal.component';

@Component({
  selector: 'app-habilidades',
  imports: [
    RouterModule,
    MatDialogModule
  ],
  templateUrl: './habilidades.component.html',
  styleUrl: './habilidades.component.css'
})
export class HabilidadesComponent {

  constructor(
    public dialog: MatDialog,
  ) { }

  openHabilidadeDialog(name: string, resp:string) {
    let configResponsiva: MatDialogConfig = {
      panelClass: "dialog-responsivo-habil"
    }
    const dialogRef = this.dialog.open(DialogModalComponent, configResponsiva);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.componentInstance.capturaHablidade = name;
    dialogRef.componentInstance.resp             = resp;
  }
}
