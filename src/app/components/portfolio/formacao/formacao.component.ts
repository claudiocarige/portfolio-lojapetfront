import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CursosData } from 'src/app/data/cursosData';

@Component({
  selector: 'app-formacao',
  imports: [
    RouterModule
  ],
  templateUrl: './formacao.component.html',
  styleUrl: './formacao.component.css'
}) 
export class FormacaoComponent {

  displayFormacao: any = "container-formação"
  displayCursos:   any = "container-cursos"
  displayTitle:    any = "subtitle"

  listaCursos: any[] = CursosData;
  
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
