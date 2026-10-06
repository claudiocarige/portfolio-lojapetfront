import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector:    'app-portfolio-home',
  standalone:  true,
  imports: [
    RouterModule,
    MatRippleModule,
    MatTooltipModule
  ],
  templateUrl: './portfolio-home.component.html',
  styleUrls:  ['./portfolio-home.component.css']
})
export class PortfolioHomeComponent implements OnInit {
  
  centered  = false;
  disabled  = false;
  unbounded = false;

  radius:    number;
  color:     string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
