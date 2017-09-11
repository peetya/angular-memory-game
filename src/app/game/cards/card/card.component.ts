import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { Card } from './card.model';

@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: Card;
  @Output() onCardFlipped = new EventEmitter<Card>();

  constructor() { }

  ngOnInit() { }

  flipCard() {
    if (this.card.isClickable) {
      this.onCardFlipped.emit(this.card);
    }
  }
}
