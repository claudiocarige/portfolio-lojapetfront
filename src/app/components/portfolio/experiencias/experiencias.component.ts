import { Component, OnInit    } from '@angular/core';
import { MatDialog            } from '@angular/material/dialog';
import { DialogModalComponent } from '../dialog-modal/dialog-modal.component';

@Component({
  selector:    'app-experiencias',
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
    const dialogRef = this.dialog.open(DialogModalComponent, {
            height: '95%',
            width: '45%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.componentInstance.capturaId = name;
    dialogRef.componentInstance.resp = resp;
  }
}
