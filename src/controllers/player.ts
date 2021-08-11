import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';

export class Player {
  private _hand: object[];
  private _name: string;

  constructor(hand: object[], name?: string) {
    this._hand = hand;

    if (!name) {
      this._name = uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        separator: '',
        style: 'capital'
      });
    } else {
      this._name = name;
    }
  }

  get hand() {
    return this._hand;
  }

  set hand(hand: object[]) {
    this._hand = hand;
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }
}
