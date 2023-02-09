import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { modelhabilidadeData } from 'src/app/data/habilidadesData';
import { modelDialogData } from 'src/app/data/modelDialogData';

@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.css']
})
export class DialogModalComponent implements OnInit {

  id: any | null = '1'
  title: string
  dataInicio: string
  dataFim: string
  status: string
  cargo: string
  atividades: any[] = []
  descricao: string

  @Input()
  capturaId: any | null

  @Input()
  capturaHablidade: any

  @Input()
  resp: any

  displayExperiencia = 'article-row'
  buttonExp = 'buttonNone'
  displayHabilidade = 'article-row-2'
  buttonHabil = 'buttonNone1'

  list: any[] = modelDialogData
  listHabilidade: any[] = modelhabilidadeData
  listModal: any[] = []
  
  constructor(
    private route: ActivatedRoute,
    private toast: ToastrService,

  ) { }

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
      this.title = element.title
      this.dataInicio = element.dataInicio
      this.dataFim = element.dataFim
      this.status = element.status
      this.cargo = element.cargo
      this.atividades = element.atividades
      this.descricao = element.descricao
    });
  }
  modalConhecimento() {
    this.mudarDisplayExperiencia();
    const modalResult = this.listHabilidade.filter(article => {
      return article.id === this.capturaHablidade
    })
    modalResult.forEach(element => {
      this.title = element.habil
      this.descricao = element.descricao2
    });
  }
  mudarDisplayExperiencia() {
    this.displayExperiencia = 'none';
    this.buttonExp = 'none'
  }
  mudarDisplayHabilidade() {
    this.displayHabilidade = 'none';
    this.buttonHabil = 'none'
  }
}
