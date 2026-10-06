import { Component, OnInit, viewChild, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { ServicePet } from 'src/app/models/moodelServicePet';
import { ServicePetService } from 'src/app/services/service-pet.service';

@Component({
  selector: 'app-service-pet-list',
  imports: [
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule
  ],
  templateUrl: './service-pet-list.component.html',
  styleUrl: './service-pet-list.component.css'
})
export class ServicePetListComponent implements OnInit {
  ELEMENT_DATA:    ServicePet[] = []
  FILTER_SERVICE: ServicePet [] = []

  displayedColumns: string[] = ['id', 'title', 'client', 'employee', 'priority', 'status', 'openDate', 'closingDate', 'comments', 'acoes'];
  dataSource = new MatTableDataSource<ServicePet>(this.ELEMENT_DATA);

  readonly paginator = viewChild(MatPaginator);

  private readonly service = inject(ServicePetService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void{
    this.service.findAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resposta) => {
          this.ELEMENT_DATA = resposta;
          this.dataSource = new MatTableDataSource<ServicePet>(this.ELEMENT_DATA);
          this.dataSource.paginator = this.paginator() ?? null;
        },
        error: (ex) => {
          console.error('Erro ao listar serviços:', ex);
        }
      });
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
    this.dataSource.paginator = this.paginator() ?? null;
  }

  delete(id: any): void {
    if (confirm('Deseja realmente excluir este serviço?')) {
      this.service.delete(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.findAll();
          },
          error: (ex) => {
            console.error('Erro ao excluir serviço:', ex);
          }
        });
    }
  }
  refreshLimpar():void{
    location.reload()
  }
}
