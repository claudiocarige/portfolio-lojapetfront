import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector:    'app-sobremim',
  standalone:  true,
  imports: [
    RouterModule
  ],
  templateUrl: './sobremim.component.html',
  styleUrls:  ['./sobremim.component.css']
})
export class SobremimComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
