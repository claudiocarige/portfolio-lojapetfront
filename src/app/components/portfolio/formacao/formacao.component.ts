import { Component, OnInit } from '@angular/core';
import { CursosData        } from 'src/app/data/cursosData';

@Component({
  selector:    'app-formacao',
  templateUrl: './formacao.component.html',
  styleUrls:  ['./formacao.component.css']
}) 
export class FormacaoComponent implements OnInit {

  displayFormacao: any = "container-formação"
  displayCursos:   any = "container-cursos"
  displayTitle:    any = "subtitle"

  listaCursos:  any [] = CursosData;
  constructor() { }

  ngOnInit(): void {
  }
  
  openCursos() {
    this.displayFormacao = "none"
    this.displayCursos   = "inline-flex"
    this.displayTitle    = "block"
  }

  openFormacao() {
    this.displayCursos   = "none"
    this.displayFormacao = "block"
    this.displayTitle    = "none"
}
}
