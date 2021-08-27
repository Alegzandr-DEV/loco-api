import { Card } from './card';
import { Characteristics } from './types';

export function createDeck() {
  const faces = ['switch', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'skip', 'reverse', 'drawTwo', 'wild', ' wildFour'];
  const colors = ['blue', 'red', 'green', 'yellow', 'gray'];
  const values = [10, 20, 30, 30, 40, 40, 50];
  let deck: Characteristics[] = [];

  for (let color of colors) {
    if (color === 'gray') {
      for (let i = 0; i < 4; i++) {
        deck.push(new Card(color, faces[0], values[4]));
        deck.push(new Card(color, faces[13], values[5]));
        deck.push(new Card(color, faces[14], values[6]));
      }
    } else {
      for (let face of faces) {
        switch (face) {
          case 'switch' :
            deck.push(new Card(color, faces[0], values[3]));
            break;
          case 'one' :
            for (let i = 0; i < 2; i++) deck.push(new Card(color, faces[1], 1));
            break;
          case 'two' :
            for (let i = 0; i < 2; i++) deck.push(new Card(color, faces[2], 2));
            break;
          case 'three' :
            for (let i = 0; i < 2; i++) deck.push(new Card(color, faces[3], 3));
            break;
          case 'four' :
            for (let i = 0; i < 2; i++) deck.push(new Card(color, faces[4], 4));
            break;
          case 'five' :
            for (let i = 0; i < 2; i++) deck.push(new Card(color, faces[5], 5));
            break;
          case 'six' :
            for (let i = 0; i < 2; i++) deck.push(new Card(color, faces[6], 6));
            break;
          case 'seven' :
            for (let i = 0; i < 2; i++) deck.push(new Card(color, faces[7], 7));
            break;
          case 'eight' :
            for (let i = 0; i < 2; i++) deck.push(new Card(color, faces[8], 8));
            break;
          case 'nine' :
            for (let i = 0; i < 2; i++) deck.push(new Card(color, faces[9], 9));
            break;
          case 'skip' :
            for (let i = 0; i < 2; i++) deck.push(new Card(color, faces[10], values[1]));
            break;
          case 'reverse' :
            for (let i = 0; i < 2; i++) deck.push(new Card(color, faces[11], values[0]));
            break;
          case 'drawTwo' :
            for (let i = 0; i < 2; i++) deck.push(new Card(color, faces[12], values[2]));
            break;
        }
      }
    }
  }

  return deck;
}
