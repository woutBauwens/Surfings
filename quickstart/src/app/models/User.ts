export class User {
  private _username: string;
  private _password: string;

  constructor(naam: string, pass: string) {
    this._username = naam;
    this._password = pass;
  }

  get username(): string{
    return this._username;
  }

  get password(): string{
    return this._password;
  }
}
