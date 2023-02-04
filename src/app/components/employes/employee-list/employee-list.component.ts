import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource           } from '@angular/material/table';
import { Employee }  from 'src/app/models/dataEmployee'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  ELEMENT_DATA: Employee[] = [
   { 
    id: 1,
    nome: 'Claudio',
    cpf:'89496531504',
    email: 'ccarige@mail.com',
    password: '123456',
    profile: ['0'],
    criationDate: '04/02/2023'
}
]

  displayedColumns: string[] = ['id', 'nome', 'email', 'cpf', 'acoes'];
  dataSource = new MatTableDataSource<Employee>(this.ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

