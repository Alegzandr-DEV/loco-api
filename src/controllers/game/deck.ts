import { shuffle } from './shuffle';
import { createDeck } from './createDeck';

export class Deck {
  private _deck: { 'value': string, 'color': string }[] = createDeck();

  constructor() {
    shuffle(this._deck);
  }

  get deck() {
    return this._deck;
  }

  set deck(deck: { value: string, color: string }[]) {
    this._deck = deck;
  }

  drawHand() {
    let hand = [];

    for (let i = 0; i < 8; i++) hand.push(this._deck[i]);
    this._deck.splice(0, 8);

    return hand;
  }

  drawFirstCard() {
    let firstCard = {};

    for (let i = 0; i < this._deck.length; i++) {
      if (this._deck[0].value === 'one' 
        || this._deck[0].value === 'two'
        || this._deck[0].value === 'three'
        || this._deck[0].value === 'four'
        || this._deck[0].value === 'five'
        || this._deck[0].value === 'six'
        || this._deck[0].value === 'seven'
        || this._deck[0].value === 'eight'
        || this._deck[0].value === 'nine'
      ) {
        firstCard = this._deck[0]
        this._deck.shift();
        
        return firstCard;
      } else {
        this._deck.push(this._deck[0]);
        this._deck.shift();
      }
    }
  }
}
