import { Component, OnInit    } from '@angular/core';
import { DialogModalComponent } from '../dialog-modal/dialog-modal.component';
import { MatDialog, MatDialogConfig            } from '@angular/material/dialog';

@Component({
  selector:    'app-habilidades',
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
