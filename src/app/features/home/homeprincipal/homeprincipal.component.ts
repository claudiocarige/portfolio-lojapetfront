import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { ChamadoService, Chamado } from '../../../core/services/chamado.service';
import { LoggerService } from '../../../core/services/logger.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-homeprincipal',
    imports: [MatExpansionModule, MatButtonModule, MatDividerModule, MatIconModule, MatSlideToggleModule, CommonModule],
    templateUrl: './homeprincipal.component.html',
    styleUrl: './homeprincipal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeprincipalComponent implements OnInit {

  private readonly CONTEXT = 'HomeprincipalComponent';
  readonly panelOpenState = signal(false);
  readonly chamados = signal<Chamado[]>([]);

  constructor(
    private chamadoService: ChamadoService,
    private logger: LoggerService
    ,
    private router: Router
  ) {
    this.logger.info(this.CONTEXT, 'Componente criado');
  }

  criarCliente(): void {
    this.router.navigate(['/criar-cliente']);
  }

  criarChamado(): void {
    this.router.navigate(['/criar-chamado']);
  }

  ngOnInit(): void {
    this.logger.info(this.CONTEXT, 'Inicializando');
    // Carrega chamados da API configurada (se houver) ou fallback para memória
    this.chamadoService.fetchChamados().then(dados => {
      this.chamados.set(dados);
      this.logger.info(this.CONTEXT, 'Chamados carregados', { total: dados.length });
    });
  }
}
