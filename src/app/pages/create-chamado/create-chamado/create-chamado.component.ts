import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoggerService } from '../../../core/services/logger.service';

@Component({
  selector: 'app-create-chamado',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './create-chamado.component.html',
  styleUrl: './create-chamado.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateChamadoComponent implements OnInit {

  private readonly CONTEXT = 'CreateChamadoComponent';

  constructor(private logger: LoggerService) {
    this.logger.info(this.CONTEXT, 'Componente criado');
  }

  ngOnInit(): void {
    this.logger.info(this.CONTEXT, 'Inicializando formulário');
  }
}
