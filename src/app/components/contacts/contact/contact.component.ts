import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit                   } from '@angular/core';

@Component({
  selector:    'app-contact',
  templateUrl: './contact.component.html',
  styleUrls:  ['./contact.component.css'],
  animations: [
              trigger('fade', [ 
              transition('void => *', [
              style({ opacity: 0 }), 
              animate(2000, style({opacity: 1}))
            ]) 
        ])
    ]
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
