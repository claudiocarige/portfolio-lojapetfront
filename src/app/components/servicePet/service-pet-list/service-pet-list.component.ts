import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator                 } from '@angular/material/paginator';
import { MatTableDataSource           } from '@angular/material/table';
import { ToastrService                } from 'ngx-toastr';
import { ServicePet                   } from 'src/app/models/moodelServicePet';
import { ServicePetService            } from 'src/app/services/service-pet.service';

@Component({
  selector:    'app-service-pet-list',
  templateUrl: './service-pet-list.component.html',
  styleUrls:  ['./service-pet-list.component.css']
})
export class ServicePetListComponent implements OnInit {
  ELEMENT_DATA:    ServicePet[] = []
  FILTER_SERVICE: ServicePet [] = []

  displayedColumns: string[] = ['id', 'title', 'client', 'employee', 'priority', 'status', 'openDate', 'closingDate', 'comments', 'acoes'];
  dataSource = new MatTableDataSource<ServicePet>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: ServicePetService,
    private toast: ToastrService

  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void{
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<ServicePet>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  retornaPrioridade(priority: any): string{
    switch(priority){
      case 0:
        return 'BAIXA'
        break;
      case 1:
        return 'MEDIA'
        break;
      case  2: 
        return 'ALTA'
        break;
        default:
          return 'SEM PRIORIDADE'
    }
  }
  retornaStatus(status: any): string{
    switch(status){
      case 0:
        return 'ABERTO'
        break;
      case 1:
        return 'ANDAMENTO'
        break;
      case  2: 
        return 'ENCERRADO'
        break;
        default:
          return 'SEM STATUS'
    }
  }
  filterByStatus(status: any): void{
    let list: ServicePet[] = [];
    this.ELEMENT_DATA.forEach(element => {
      if(element.status === status)
          list.push(element);
    });
    this.FILTER_SERVICE = list;
    this.dataSource = new MatTableDataSource<ServicePet>(this.FILTER_SERVICE);
    this.dataSource.paginator = this.paginator;
  }

  notDelete(){
    this.toast.error("Não é permitido deletar serviços. Por favor entre em contato com o Administrador.", "I M P O R T A N T E !", {timeOut: 5000})
  }
  refreshLimpar():void{
    location.reload()
  }
}
