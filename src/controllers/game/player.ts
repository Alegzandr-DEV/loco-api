export class Player {
  private _name: string;
  private _hand: object[];

  constructor(name: string, hand: object[]) {
    this._name = name;
    this._hand = hand;
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get hand() {
    return this._hand;
  }

  set hand(hand: object[]) {
    this._hand = hand;
  }
}
