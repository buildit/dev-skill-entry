import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatCardModule, MatIconModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { of, Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: SpyObj<Router>;
  let afAuthSpy: SpyObj<any>;

  beforeEach(async(() => {
    routerSpy = createSpyObj(['navigate']);

    afAuthSpy = {
      auth: createSpyObj(['signInWithPopup', 'signOut']),
      authState: of(Observable),
    };

    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [ LoginComponent ],
      providers: [
        {
          provide: Router,
          useValue: routerSpy,
        },
        {
          provide: AngularFireAuth,
          useValue: afAuthSpy,
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
