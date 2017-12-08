import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { NewRestaurantComponent } from './new-restaurant.component';
import { RestaurantListComponent } from './restaurant-list.component';
import { PageNotFoundComponent } from './notFound.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const appRoutes: Routes = [
  { path: '',   redirectTo: '/Home', pathMatch: 'full' },
 // { path: 'restaurant/:id',      component: RestaurantComponent },
  { path: 'Home',      component: HomeComponent },
  { path: 'newRestaurant',      component: NewRestaurantComponent },
  {
    path: 'Restaurants',
 //   canActivate: [ AuthGuardService ],
    component: RestaurantListComponent,
    data: { title: 'Restaurants' }
  },
  { path: 'login',      component: LoginComponent },
    { path: 'register',      component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    RestaurantListComponent,
    NewRestaurantComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
