import { Routes } from '@angular/router';
import { PhoneNumbersComponent } from './numbers/phone-numbers.component';
import { HomeComponent } from './home/home.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'numbers', component: PhoneNumbersComponent }
];
