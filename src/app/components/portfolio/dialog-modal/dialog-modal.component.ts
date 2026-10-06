import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { modelhabilidadeData } from 'src/app/data/habilidadesData';
import { modelDialogData } from 'src/app/data/modelDialogData';

@Component({
  selector: 'app-dialog-modal',
  imports: [
    RouterModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './dialog-modal.component.html',
  styleUrl: './dialog-modal.component.css'
})
export class DialogModalComponent implements OnInit {

  id: string | null = '1';
  title = '';
  dataInicio = '';
  dataFim = '';
  status = '';
  cargo = '';
  atividades: any[] = [];
  descricao = '';

  capturaId: string | null = null;
  capturaHablidade: string | null = null;
  resp: string | null = null;

  displayExperiencia = 'article-row';
  buttonExp = 'buttonNone';
  displayHabilidade = 'article-row-2';
  buttonHabil = 'buttonNone1';

  list: any[] = modelDialogData;
  listHabilidade: any[] = modelhabilidadeData;
  listModal: any[] = [];

  ngOnInit(): void {

    if (this.resp != '1') {
      this.modalConhecimento();
    } else {
      this.modalExperiencia();
    }
  }

  modalExperiencia() {
    this.mudarDisplayHabilidade();
    const modalResult = this.list.filter(article => {
      return article.id === this.capturaId
    })
    modalResult.forEach(element => {
      this.title      = element.title
      this.dataInicio = element.dataInicio
      this.dataFim    = element.dataFim
      this.status     = element.status
      this.cargo      = element.cargo
      this.atividades = element.atividades
      this.descricao  = element.descricao
    });
  }
  modalConhecimento() {
    this.mudarDisplayExperiencia();
    const modalResult = this.listHabilidade.filter(article => {
      return article.id === this.capturaHablidade
    })
    modalResult.forEach(element => {
      this.title     = element.habil
      this.descricao = element.descricao2
    });
  }
  mudarDisplayExperiencia() {
    this.displayExperiencia = 'none';
    this.buttonExp          = 'none'
  }
  mudarDisplayHabilidade() {
    this.displayHabilidade = 'none';
    this.buttonHabil       = 'none'
  }
}
