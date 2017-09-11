import { Component, OnInit } from '@angular/core';
import {Card} from "./cards/card/card.model";
import {GameService} from "./game.service";
import {Game} from "./game.model";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  cards: Card[] = [];
  remainingCards: Card[] = [];
  game: Game;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.startNewGame();
    this.cards = this.gameService.getCardList();
    this.game = this.gameService.game;
  }

  onNewGameStarted() {
    this.gameService.startNewGame();
    this.cards = this.gameService.getCardList();
  }

  onGameEnded() {
    this.gameService.endGame();
  }

  onCardFlipped(card: Card) {
    this.gameService.checkCard(card);
  }

  isGameEnded() {
    return this.gameService.isGameEnded;
  }
}
