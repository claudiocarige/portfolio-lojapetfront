import { Component, OnInit    } from '@angular/core';
import { RouterModule         } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { DialogModalComponent } from '../dialog-modal/dialog-modal.component';

@Component({
  selector:    'app-habilidades',
  standalone:  true,
  imports: [
    RouterModule,
    MatDialogModule
  ],
  templateUrl: './habilidades.component.html',
  styleUrls:  ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }
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
