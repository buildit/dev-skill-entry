import { TestBed, ComponentFixture } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import { of, Observable } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let afAuthSpy: SpyObj<any>;

  function populate() {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFireAuth,
          useValue: afAuthSpy,
        },
      ],
    });

    service = TestBed.get(AuthService);
  }

  beforeEach(() => {
    afAuthSpy = {
      auth: createSpyObj(['signInWithPopup', 'signInWithEmailAndPassword', 'createUserWithEmailAndPassword', 'signOut']),
      authState: of(Observable),
    };

    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        if (key in store) {
          return store[key];
        } else {
          return null;
        }
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
  });

  it('should be created', () => {
    populate();
    expect(service).toBeTruthy();
  });

  describe('login method', () => {
    describe('google login', () => {
      it('should trigger the AngularFireAuth popup', () => {
        afAuthSpy.auth.signInWithPopup.and.returnValue(of());

        populate();
        service.loginWithGoogle();

        expect(afAuthSpy.auth.signInWithPopup).toHaveBeenCalled();
      });
    });

    describe('email login', () => {
      it('should be able to login with email and password', () => {
        afAuthSpy.auth.signInWithEmailAndPassword.and.returnValue(of());

        populate();
        service.loginWithEmail('test@test.com', 'test123');

        expect(afAuthSpy.auth.signInWithEmailAndPassword).toHaveBeenCalled();
      });
    });

    describe('github login', () => {
      it('should be able to login with AngularFireAuth popup', () => {
        afAuthSpy.auth.signInWithPopup.and.returnValue(of());

        populate();
        service.loginWithGithub();

        expect(afAuthSpy.auth.signInWithPopup).toHaveBeenCalled();
      });
    });
  });

  describe('register method', () => {
    it('user should be able to register a new account', () => {
      afAuthSpy.auth.createUserWithEmailAndPassword.and.returnValue(of());

      populate();
      service.register('test@test.com', 'test123');

      expect(afAuthSpy.auth.createUserWithEmailAndPassword).toHaveBeenCalled();
    });
  });

  describe('logout method', () => {
    it('should call the firebase signOut method', () => {
      afAuthSpy.auth.signOut.and.returnValue(of());

      populate();
      service.logout();

      expect(afAuthSpy.auth.signOut).toHaveBeenCalled();
    });
  });

  describe('authenticated property', () => {
    it('should return true for authenticated property when there is a user in localStorage', () => {
      populate();

      localStorage.setItem('user', JSON.stringify({}));

      expect(service.authenticated).toBeTruthy();
    });

    it('should return false for authenticated property when there is not a user in localStorage', () => {
      populate();

      localStorage.clear();

      expect(service.authenticated).toBeFalsy();
    });
  });

  describe('user property', () => {
    it('should have a user if there is a user in localStorage', () => {
      populate();

      localStorage.setItem('user', JSON.stringify({}));

      expect(service.user).toEqual({});
    });
  });
});
