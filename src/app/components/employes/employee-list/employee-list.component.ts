import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator                 } from '@angular/material/paginator';
import { MatTableDataSource           } from '@angular/material/table';
import { Employee                     } from 'src/app/models/modelEmployee'
import { EmployeesService             } from 'src/app/services/employees.service';

@Component({
  selector:    'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls:  ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  ELEMENT_DATA: Employee[] = []

  displayedColumns: string[] = ['id', 'nome', 'email', 'cpf', 'profile', 'acoes'];
  dataSource = new MatTableDataSource<Employee>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: EmployeesService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Employee>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

