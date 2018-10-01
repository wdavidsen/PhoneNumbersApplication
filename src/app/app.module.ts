import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PhoneNumbersComponent } from './numbers/phone-numbers.component';
import { NumberSubmitComponent } from './number-submit/number-submit.component';
import { NumberListComponent } from './number-list/number-list.component';
import { HeaderComponent } from './header/header.component';
import { PhoneCombinationService } from './services/phone-combinations.service';
import { ROUTES } from './app.routes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, { useHash: false }),
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    NgbModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PhoneNumbersComponent,
    NumberSubmitComponent,
    NumberListComponent,
    NumberSubmitComponent,
    NumberListComponent
  ],
  providers: [
    PhoneCombinationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
