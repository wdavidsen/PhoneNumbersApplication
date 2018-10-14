import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ROUTES } from './app.routes';
import { HomeComponent } from './home/home.component';
import { PhoneNumbersComponent } from './numbers/phone-numbers.component';
import { NumberListComponent } from './number-list/number-list.component';
import { NumberSubmitComponent } from './number-submit/number-submit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterModule.forRoot(ROUTES, { useHash: false }),
        NgbModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        PhoneNumbersComponent,
        NumberListComponent,
        NumberSubmitComponent
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' }
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  }));
});
