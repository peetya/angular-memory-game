import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Card} from "./card/card.model";

@Component({
  selector: 'app-cards',
  templateUrl: 'cards.component.html',
  styleUrls: ['cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() cards: Card[];
  @Output() onCardFlipped = new EventEmitter<Card>();

  constructor() {}

  ngOnInit() {}

  flipCard(card: Card) {
    this.onCardFlipped.emit(card);
  }
}
