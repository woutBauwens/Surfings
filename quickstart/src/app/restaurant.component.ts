import { Component } from '@angular/core';
import { Restaurant } from './models/Restaurant';
import { RestaurantService } from './restaurant.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
    providers: [RestaurantService],
  template: `
    <h2>Restaurant</h2>
    <p>Please register your restaurant</p>
  `
})

export class RestaurantComponent implements OnInit {
  public restaurants: String[];

  constructor() {
  }

  ngOnInit() {

  }

  get Restaurants() {
      return this.restaurants;
    }
}
