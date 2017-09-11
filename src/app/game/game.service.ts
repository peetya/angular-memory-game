import {Game} from "./game.model";
import {Card} from "./cards/card/card.model";
import {CARD_DATA} from "./cards/card/card.data";

export class GameService {
  id: number             = 0;
  cards: Card[]          = [];
  remainingCards: Card[] = [];
  isGameEnded: boolean   = false;
  game: Game;

  constructor() {
    this.game = new Game();
  }

  startNewGame() {
    this.isGameEnded = false;
    this.game.currentGameStarted = new Date();
    this.game.currentGameTime = null;
    this.game.currentGameAttempts = 0;
    this.cards = this.generateNewCardList();
  }

  endGame() {
    this.isGameEnded = true;
    this.game.currentGameEnded = new Date();
    this.game.currentGameTime   = Math.ceil((Math.abs(this.game.currentGameEnded.getTime() - this.game.currentGameStarted.getTime())) / (1000 * 3600 * 24));

    if (this.game.highscoreGameAttempts) {
      if (this.game.highscoreGameAttempts > this.game.currentGameAttempts) {
        this.game.highscoreGameAttempts = this.game.currentGameAttempts;
      }
    } else {
      this.game.highscoreGameAttempts = this.game.currentGameAttempts;
    }

    if (this.game.highscoreGameTime) {
      if (this.game.highscoreGameTime > this.game.currentGameTime) {
        this.game.highscoreGameTime = this.game.currentGameTime;
      }
    } else {
      this.game.highscoreGameTime = this.game.currentGameTime;
    }

    console.log("Game ended!");
  }

  generateUniqueId() {
    this.id++;
    return this.id;
  }

  getCardList(): Card[] {
    return this.cards;
  }

  generateNewCardList(): Card[] {
    this.cards = [];

    CARD_DATA.forEach((val) => {
      let card      = new Card(this.generateUniqueId(), val.symbol, val.backgroundColor);
      let cardClone = new Card(this.generateUniqueId(), val.symbol, val.backgroundColor);

      this.cards.push(card);
      this.cards.push(cardClone);
    });

    GameService.shuffleArray(this.cards);

    this.remainingCards = this.cards;

    return this.cards;
  }

  static shuffleArray(arr: Card[]): Card[] {
    for(let i = arr.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [arr[i-1], arr[j]] = [arr[j], arr[i-1]];
    }

    return arr;
  }

  checkCard(card: Card) {
    let flippedCards = this.remainingCards.filter((val) => {
      return val.isFlipped == true;
    });

    switch(flippedCards.length) {
      case 0:
        card.isFlipped = true;
        card.isClickable = false;
        break;

      case 1:
        card.isFlipped = true;
        card.isClickable = false;

        if (flippedCards[0].symbol != card.symbol) {
          this.game.currentGameAttempts++;
          setTimeout(() => {
            flippedCards[0].isClickable = true;
            flippedCards[0].isFlipped = false;
            card.isClickable = true;
            card.isFlipped = false;
          }, 600);
        } else {
          this.remainingCards = this.remainingCards.filter((val) => {
            return val.id != card.id && val.id != flippedCards[0].id;
          });

          if (this.remainingCards.length == 0) {
            this.endGame();
          } else {
            this.game.currentGameAttempts++;
          }
        }

        break;
    }
  }
}
