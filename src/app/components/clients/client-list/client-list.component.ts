import { Component, OnInit, viewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Client } from 'src/app/models/modelClient';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-client-list',
  imports: [MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, RouterModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {

  private readonly service = inject(ClientsService);
  readonly paginator = viewChild(MatPaginator);

  ELEMENT_DATA: Client[] = []

  displayedColumns: string[] = ['id', 'nome', 'email', 'cpf', 'acoes'];
  dataSource = new MatTableDataSource<Client>(this.ELEMENT_DATA);

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Client>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator() ?? null;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
