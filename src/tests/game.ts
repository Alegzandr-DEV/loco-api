import { Deck } from '../controllers/game/deck';
//import { Player } from '../controllers/game/player';

const deck = new Deck();
//const alegz = new Player('Alegz', deck.drawHand());
const firstCard = deck.drawFirstCard();

console.log(firstCard);
