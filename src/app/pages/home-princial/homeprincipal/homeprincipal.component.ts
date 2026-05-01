import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { ChamadoService, Chamado } from '../../../core/services/chamado.service';
import { LoggerService } from '../../../core/services/logger.service';

@Component({
  selector: 'app-homeprincipal',
  standalone: true,
  imports: [MatExpansionModule, MatButtonModule, MatDividerModule, MatIconModule, MatSlideToggleModule, CommonModule],
  templateUrl: './homeprincipal.component.html',
  styleUrl: './homeprincipal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeprincipalComponent implements OnInit {

  private readonly CONTEXT = 'HomeprincipalComponent';
  readonly panelOpenState = signal(false);
  readonly chamados = signal<Chamado[]>([]);

  constructor(
    private chamadoService: ChamadoService,
    private logger: LoggerService
  ) {
    this.logger.info(this.CONTEXT, 'Componente criado');
  }

  ngOnInit(): void {
    this.logger.info(this.CONTEXT, 'Inicializando');
    const dados = this.chamadoService.getChamados();
    this.chamados.set(dados);
    this.logger.info(this.CONTEXT, 'Chamados carregados', { total: dados.length });
  }
}
