import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatPaginator                  } from '@angular/material/paginator';
import { MatTableDataSource            } from '@angular/material/table';
import { Client                        } from 'src/app/models/client';
import { ClientsService                } from 'src/app/services/clients.service';

@Component({
  selector:     'app-client-list',
  templateUrl:  './client-list.component.html',
  styleUrls:   ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  ELEMENT_DATA: Client[] = []

  displayedColumns: string[] = ['id', 'nome', 'email', 'cpf', 'acoes'];
  dataSource = new MatTableDataSource<Client>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ClientsService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Client>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
