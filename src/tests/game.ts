import { Deck, Player } from '../controllers/game';

const deck = new Deck();
const alegz = new Player('Alegz', deck.drawHand());
const firstCard = deck.drawFirstCard();

console.log(alegz);
console.log(firstCard);
