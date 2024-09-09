import {ChangeDetectionStrategy, Component, signal} from '@angular/core';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-homeprincipal',
  standalone: true,
  imports: [MatExpansionModule, MatButtonModule, MatDividerModule, MatIconModule, MatSlideToggleModule, CommonModule],
  templateUrl: './homeprincipal.component.html',
  styleUrl: './homeprincipal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeprincipalComponent {
  readonly panelOpenState = signal(false);

  chamados = [
    {
      id: '#_0001',
      responsavel: 'Luiz Henrique',
      contato: '7199999999',
      endereco: 'Rua Estevam Barbosa, 123',
      description: 'Descrição do chamado 1',
    },
    {
      id: '#_0002',
      responsavel: 'Maria eduarda',
      contato: '71888888888',
      endereco: 'Rua Estevam Barbosa, 123',
      description: 'Descrição do chamado 2',
    },
    {
      id: '#_0003',
      responsavel: 'João Pedro',
      contato: '71777777777',
      endereco: 'Rua Estevam Barbosa, 123',
      description: 'Descrição do chamado 3',
    },
    {
      id: '#_0004',
      responsavel: 'Ana Clara',
      contato: '71666666666',
      endereco: 'Rua Estevam Barbosa, 123',
      description: 'Descrição do chamado 4',
    },
    {
      id: '#_0005',
      responsavel: 'Lucas Silva',
      contato: '71555555555',
      endereco: 'Rua Estevam Barbosa, 123',
      description: 'Descrição do chamado 5',
    },

  ];
}
