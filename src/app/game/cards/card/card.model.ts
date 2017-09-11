export class Card {
  public id: number;
  public symbol: string;
  public backgroundColor: string;
  public isFlipped: boolean;
  public isClickable: boolean;

  constructor(id: number, symbol: string, backgroundColor: string) {
    this.id = id;
    this.symbol = symbol;
    this.backgroundColor = backgroundColor;
    this.isFlipped = false;
    this.isClickable = true;
  }
}
