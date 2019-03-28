import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { MatCardModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { of, Observable, throwError } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseService } from 'src/app/services/database/database.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let routerSpy: SpyObj<Router>;
  let afAuthSpy: SpyObj<any>;
  let authServiceSpy: SpyObj<any>;
  let databaseServiceSpy: SpyObj<any>;

  beforeEach(async(() => {
    routerSpy = createSpyObj(['navigate']);

    afAuthSpy = {
      auth: createSpyObj(['createUserWithEmailAndPassword']),
      authState: of(Observable),
    };

    authServiceSpy = createSpyObj(['register']);
    authServiceSpy.register.and.returnValue(of({user: { displayName: 'Spencer', email: 'test@test.com', uid: '1234'}}));

    const angularFirestoreSpy = {
      collection: jasmine.createSpy('collection').and.returnValue({}),
    };

    databaseServiceSpy = createSpyObj(['setUser']);
    databaseServiceSpy.setUser.and.returnValue(of(Promise));

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        MatCardModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: Router,
          useValue: routerSpy,
        },
        {
          provide: AngularFireAuth,
          useValue: afAuthSpy,
        },
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
        {
          provide: AngularFirestore,
          useValue: angularFirestoreSpy,
        },
        {
          provide: DatabaseService,
          useValue: databaseServiceSpy,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register new user', () => {
    const form = {
      value: {
        email: 'test@test.com',
        password: 'test123',
      },
    };

    component.register(form as any);

    expect(authServiceSpy.register).toHaveBeenCalledWith(
      form.value.email,
      form.value.password,
    );
  });

  it('should set user in database', () => {
    const form = {
      value: {
        email: 'test@test.com',
        password: 'test123',
      },
    };

    const userInfo = {
      displayName: 'Spencer',
      email: 'test@test.com',
      uid: '1234',
    };

    component.register(form as any);

    expect(databaseServiceSpy.setUser).toHaveBeenCalledWith(userInfo);
  });

  it('should navigate to /users upon successful registration', () => {
    const form = {
      value: {
        email: 'test@test.com',
        password: 'test123',
      },
    };

    component.register(form as any);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('should have an error message when registration fails', () => {
    const form = {
      value: {
        email: 'test@test.com',
        password: 'test123',
      },
    };

    authServiceSpy.register.and.returnValue(throwError({message: 'This email is already in the system'}));

    component.register(form as any);

    expect(component.message).toEqual('This email is already in the system');
  });
});
