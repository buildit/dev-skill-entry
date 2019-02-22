import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule, MatToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { NavComponent } from './materials/organisms/nav/nav.component';
import { AngularFireAuth } from '@angular/fire/auth';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatToolbarModule,
      ],
      declarations: [
        AppComponent,
        NavComponent,
      ],
      providers: [
        {
          provide: AngularFireAuth,
          useValue: {},
        },
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'dev-skill-entry'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('dev-skill-entry');
  });
});
