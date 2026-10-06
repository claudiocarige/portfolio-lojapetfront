import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogModalComponent } from '../dialog-modal/dialog-modal.component';

@Component({
  selector: 'app-experiencias',
  imports: [
    RouterModule,
    MatDialogModule,
    MatTooltipModule
  ],
  templateUrl: './experiencias.component.html',
  styleUrl: './experiencias.component.css'
})
export class ExperienciasComponent {

  constructor(
    public dialog: MatDialog,
  ) { }
   
  openDialog(name: string, resp: string) {
    let configResponsiva: MatDialogConfig = {
      panelClass: "dialog-responsivo"
    }
    const dialogRef = this.dialog.open(DialogModalComponent, configResponsiva);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.componentInstance.capturaId = name;
    dialogRef.componentInstance.resp = resp;
  }
}
