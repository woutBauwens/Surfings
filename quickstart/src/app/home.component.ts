import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h2>Welkom op Surfings!</h2>
    <p>Deze site is speciaal voor de mensen die gepassioneerd zijn door eten. Je kan zelf je favorite restaurants toevoegen zodat andere mensen deze plaats
        kunnen ontdekken! </p>
    <p> <a href="./user/register/register.component.html">Registreer</a> je nu en ontdek de beste plekjes in je omgeving!</p>
  `
})


export class HomeComponent {

  constructor() {
  }
}
