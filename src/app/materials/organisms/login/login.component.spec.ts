import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatCardModule, MatIconModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { of, Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { AuthService } from 'src/app/services/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseService } from 'src/app/services/database/database.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: SpyObj<Router>;
  let afAuthSpy: SpyObj<any>;
  let authServiceSpy: SpyObj<any>;
  let databaseServiceSpy: SpyObj<any>;
  let resp: SpyObj<any>;
  let doc: SpyObj<any>;

  beforeEach(async(() => {
    routerSpy = createSpyObj(['navigate']);

    afAuthSpy = {
      auth: createSpyObj(['signInWithPopup', 'signOut']),
      authState: of(Observable),
    };

    resp = {
      user: {
        displayName: 'Spencer',
        email: 'test@test.com',
        uid: '1234',
      },
    },

    doc = {
      data: jasmine.createSpy('data').and.returnValue(of()),
    },

    authServiceSpy = createSpyObj(['loginWithGoogle', 'loginWithGithub', 'loginWithEmail']);
    authServiceSpy.loginWithGoogle.and.returnValue(of(resp));
    authServiceSpy.loginWithGithub.and.returnValue(of(resp));
    authServiceSpy.loginWithEmail.and.returnValue(of(resp));

    const data = {
      set: jasmine.createSpy('set').and.returnValue(Promise),
    };

    const collectionStub = {
      doc: jasmine.createSpy('doc').and.returnValue(data),
    };

    const angularFirestoreSpy = {
      collection: jasmine.createSpy('collection').and.returnValue(collectionStub),
    };

    databaseServiceSpy = createSpyObj(['getUser']);
    databaseServiceSpy.getUser.and.returnValue(of(doc));

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

  describe('Google login', () => {
    it('should login with Google', () => {
      component.loginWithGoogle();

      expect(authServiceSpy.loginWithGoogle).toHaveBeenCalled();
    });

    it('should send user to database when loggin with google', () => {
      const userInfo = {
        displayName: 'Spencer',
        email: 'test@test.com',
        uid: '1234',
      };

      component.loginWithGoogle();

      expect(databaseServiceSpy.getUser).toHaveBeenCalledWith(userInfo);
    });

    it('upon successful login with Google should be redirected to /users', () => {
      component.loginWithGoogle();

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/users']);
    });
  });

  describe('Github login', () => {
    it('should login with Github', () => {
      component.loginWithGithub();

      expect(authServiceSpy.loginWithGithub).toHaveBeenCalled();
    });

    it('should send user to database when loggin with github', () => {
      const userInfo = {
        displayName: 'Spencer',
        email: 'test@test.com',
        uid: '1234',
      };

      component.loginWithGithub();

      expect(databaseServiceSpy.getUser).toHaveBeenCalledWith(userInfo);
    });

    it('upon successful login with Github should be redirected to /users', () => {
      component.loginWithGithub();

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/users']);
    });
  });

  describe('Email login', () => {
    it('should login with Email', () => {
      const form = {
        value: {
          email: 'test@test.com',
          password: 'test123',
        },
      };

      component.loginWithEmail(form as any);

      expect(authServiceSpy.loginWithEmail).toHaveBeenCalledWith(form.value.email, form.value.password);
    });

    it('should send user to database when logging in with email', () => {
      const userInfo = {
        displayName: 'Spencer',
        email: 'test@test.com',
        uid: '1234',
      };

      const form = {
        value: {
          email: 'test@test.com',
          password: 'test123',
        },
      };

      component.loginWithEmail(form as any);

      expect(databaseServiceSpy.getUser).toHaveBeenCalledWith(userInfo);
    });

    it('upon successful login with Email should be redirected to /users', () => {
      const form = {
        value: {
          email: 'test@test.com',
          password: 'test123',
        },
      };

      component.loginWithEmail(form as any);

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/users']);
    });
  });
});
