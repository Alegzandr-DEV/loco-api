import { shuffle } from '../utils';
import { createDeck } from './create-deck';
import { Characteristics } from './types';

export class Deck {
  private _deck: Characteristics[] = createDeck();

  constructor() {
    shuffle(this._deck);
  }

  get deck() {
    return this._deck;
  }

  set deck(deck: Characteristics[]) {
    this._deck = deck;
  }

  drawFirstCard() {
    let firstCard = {};

    for (let i = 0; i < this._deck.length; i++) {
      if (this._deck[0].face === 'one'
        || this._deck[0].face === 'two'
        || this._deck[0].face === 'three'
        || this._deck[0].face === 'four'
        || this._deck[0].face === 'five'
        || this._deck[0].face === 'six'
        || this._deck[0].face === 'seven'
        || this._deck[0].face === 'eight'
        || this._deck[0].face === 'nine'
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

  drawHand() {
    let hand = [];

    for (let i = 0; i < 8; i++) hand.push(this._deck[i]);
    this._deck.splice(0, 8);

    return hand;
  }
}
