export class Card {
  private _color: string;
  private _face: string;
  private _value: number;

  constructor(color: string, face: string, value: number) {
    this._color = color;
    this._face = face;
    this._value = value;
  }

  get color() {
    return this._color;
  }

  set color(color: string) {
    this._color = color;
  }

  get face() {
    return this._face;
  }

  set face(face: string) {
    this._face = face;
  }

  get value() {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }
}
