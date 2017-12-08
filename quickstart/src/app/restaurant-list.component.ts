import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './models/Restaurant.js';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
    providers: [RestaurantService],
  template: `
    <h2>Restaurant</h2>
    <p>All the restaurants in your neighbourhood!</p>
    <li *ngFor='let localRestaurant of _restaurants | async'> {{ localRestaurant.name }} {{ localRestaurant.type }} {{ localRestaurant.locatie }} </li>
  `
})

export class RestaurantListComponent implements OnInit {
  private _restaurants: Observable<Restaurant[]>;
  public restaurants: String[];
  private service: RestaurantService;

  constructor(private _restaurantService: RestaurantService) {
    this.service = _restaurantService;
    this._restaurants = this._restaurantService.restaurants;
}

  ngOnInit() {
    this._restaurants = this._restaurantService.restaurants;
  }
}
