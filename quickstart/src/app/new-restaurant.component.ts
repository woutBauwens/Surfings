import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './models/Restaurant.js';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
    providers: [RestaurantService],
  template: `
    <h2>Registreer je restaurant</h2>
    <p>All the restaurants in your neighbourhood!</p>
<form>
    <div>
<label for='name'>name:</label>
    <input type='text' id='name' value='{{restaurant.name}}'
           name='name' #newrestaurantname>
    
  </div>
  <div>
<label for='name'>type:</label>
<input type='text' id='type' value='{{restaurant.type}}'
           name='type' #newrestauranttype>
</div>
<div>
<label for='name'>locatie:</label>
<input type='text' id='locatie' value='{{restaurant.locatie}}'
           name='locatie' #newrestaurantlocatie>
</div>
  <button (click)='addRestaurant(newrestaurantname, newrestauranttype, newrestaurantlocatie)'>Voeg toe</button>
</form>
  `
})

export class NewRestaurantComponent implements OnInit {
  private _restaurant: Restaurant;
  private service: RestaurantService;
  private restaurant: FormGroup;

  constructor(private _restaurantService: RestaurantService) {
    this.service = _restaurantService;
}

  ngOnInit() {
    this.restaurant = new FormGroup({
      name: new FormControl('test')
    });
  }

  addRestaurant(newRestaurantName: HTMLInputElement, newRestaurantType: HTMLInputElement, newRestaurantLocatie: HTMLInputElement): boolean {
    this._restaurant = new Restaurant(newRestaurantName.value, newRestaurantType.value, newRestaurantLocatie.value);
    this.service.addRestaurant(this._restaurant);
    return false;
  }
}
