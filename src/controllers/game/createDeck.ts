import { Card } from './card';

export function createDeck() {
  const colors = ['blue', 'red', 'green', 'yellow', 'gray'];
  const cards = ['switch', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'skip', 'reverse', 'drawTwo', 'wild', ' wildFour'];
  let deck: { value: string, color: string }[] = [];

  for (let color of colors) {
    if (color === 'grey') {
      for (let i = 0; i < 4; i++) {
        deck.push(new Card(cards[0], color));
        deck.push(new Card(cards[13], color));
        deck.push(new Card(cards[14], color));
      }
    } else {
      for (let card of cards) {
        switch (card) {
          case 'switch' :
            deck.push(new Card(cards[0], color));
            break;
          case 'one' :
            for (let i = 0; i < 2; i++) deck.push(new Card(cards[1], color));
            break;
          case 'two' :
            for (let i = 0; i < 2; i++) deck.push(new Card(cards[2], color));
            break;
          case 'three' :
            for (let i = 0; i < 2; i++) deck.push(new Card(cards[3], color));
            break;
          case 'four' :
            for (let i = 0; i < 2; i++) deck.push(new Card(cards[4], color));
            break;
          case 'five' :
            for (let i = 0; i < 2; i++) deck.push(new Card(cards[5], color));
            break;
          case 'six' :
            for (let i = 0; i < 2; i++) deck.push(new Card(cards[6], color));
            break;
          case 'seven' :
            for (let i = 0; i < 2; i++) deck.push(new Card(cards[7], color));
            break;
          case 'eight' :
            for (let i = 0; i < 2; i++) deck.push(new Card(cards[8], color));
            break;
          case 'nine' :
            for (let i = 0; i < 2; i++) deck.push(new Card(cards[9], color));
            break;
          case 'skip' :
            for (let i = 0; i < 2; i++) deck.push(new Card(cards[10], color));
            break;
          case 'reverse' :
            for (let i = 0; i < 2; i++) deck.push(new Card(cards[11], color));
            break;
          case 'drawTwo' :
            for (let i = 0; i < 2; i++) deck.push(new Card(cards[12], color));
            break;
        }
      }
    }
  }

  return deck;
}
