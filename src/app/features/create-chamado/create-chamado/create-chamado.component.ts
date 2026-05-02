import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { LoggerService } from '../../../core/services/logger.service';

@Component({
  selector: 'app-create-chamado',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterModule],
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

  // Propriedades ligadas ao template (ngModel)
  senderCpfOrCnpj = '';
  recipientCpfOrCnpj = '';
  productName = '';
  quantityProduct: number | null = null;

  // Validação simples para habilitar botão
  validation(): boolean {
    return !!this.senderCpfOrCnpj && !!this.recipientCpfOrCnpj && !!this.productName && !!this.quantityProduct;
  }

  // Stub de criação (pode ser implementado posteriormente)
  createDelivery(): void {
    this.logger.info(this.CONTEXT, 'createDelivery chamado', {
      sender: this.senderCpfOrCnpj,
      recipient: this.recipientCpfOrCnpj,
      product: this.productName,
      quantity: this.quantityProduct,
    });
  }
}
