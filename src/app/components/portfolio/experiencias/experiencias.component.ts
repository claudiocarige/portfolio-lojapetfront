import { Component, OnInit    } from '@angular/core';
import { RouterModule         } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule     } from '@angular/material/tooltip';
import { DialogModalComponent } from '../dialog-modal/dialog-modal.component';

@Component({
  selector:    'app-experiencias',
  standalone:  true,
  imports: [
    RouterModule,
    MatDialogModule,
    MatTooltipModule
  ],
  templateUrl: './experiencias.component.html',
  styleUrls:  ['./experiencias.component.css']
})
export class ExperienciasComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
  
    ) { }

    ngOnInit(): void{  
    }
   
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
