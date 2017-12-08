import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
    <h1>Surfings</h1>
    <nav>
      <a routerLink="Home" routerLinkActive="active">Home</a>
      <a routerLink="Restaurants" routerLinkActive="active">Restaurants</a>
      <a routerLink="newRestaurant" routerLinkActive="active">Restaurant registreren</a>
      <a routerLink="login" routerLinkActive="active">Inloggen</a>
      <a routerLink="register" routerLinkActive="active">Registreren</a>
    </nav>
    <router-outlet></router-outlet>
    `
})

export class AppComponent {
  title = 'app';
}
