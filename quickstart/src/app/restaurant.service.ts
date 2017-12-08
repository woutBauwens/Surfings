import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Restaurant } from './models/Restaurant.js';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RestaurantService {
  private _appUrl = 'http://localhost:4200/API/Restaurants/';

  constructor(private http: Http) { }

  get restaurants(): Observable<Restaurant[]> {
    return this.http.get(this._appUrl).map((res: Response) => res.json())
                         // ...errors if any
                         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

    addRestaurant (body: Restaurant) {
     // console.log(body.locatie); test purpose
        const body2 = {name: body.naam, type: body.restType, locatie: body.locatie}; // <---- tried JSON.stringfy but did not work? not nice but found no other way
        this.http.post(this._appUrl, body2) // ...using post request
                         .subscribe();
    }
}
