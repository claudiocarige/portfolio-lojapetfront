import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-create-chamado',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './create-chamado.component.html',
  styleUrl: './create-chamado.component.scss'
})
export class CreateChamadoComponent {
  
}
