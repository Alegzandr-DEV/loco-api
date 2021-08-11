import { Deck, Player } from '../controllers';

const deck = new Deck();

const guest = new Player(deck.drawHand());
const firstCard = deck.drawFirstCard();

console.log(guest);
console.log(firstCard);
