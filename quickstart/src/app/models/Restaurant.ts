export class Restaurant {
  private _name: string;
  private _type: string;
  private _locatie: string;

  constructor(naam: string, t: string, locatie: string) {
    this._name = naam;
    this._type = t;
    this._locatie = locatie;
  }

  get naam(): String{
    return this._name;
  }

  get restType(): String{
    return this._type;
  }

  get locatie(): String{
    return this._locatie;
  }
}
