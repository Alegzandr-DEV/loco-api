export class Card {
  private _value: string;
  private _color: string;

  constructor(value: string, color: string) {
    this._value = value;
    this._color = color;
  }

  get value() {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
  }

  get color() {
    return this._color;
  }

  set color(color: string) {
    this._color = color;
  }
}
