import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-portfolio-home',
  imports: [
    RouterModule,
    MatRippleModule,
    MatTooltipModule
  ],
  templateUrl: './portfolio-home.component.html',
  styleUrl: './portfolio-home.component.css'
})
export class PortfolioHomeComponent {
  
  centered  = false;
  disabled  = false;
  unbounded = false;

  radius: number;
  color:  string;
}
