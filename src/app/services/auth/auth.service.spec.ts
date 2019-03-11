import { TestBed } from '@angular/core/testing';

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
      auth: createSpyObj(['signInWithPopup', 'signOut']),
      authState: of(Observable),
    };

    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
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
    it('should trigger the AngularFireAuth popup', () => {
      afAuthSpy.auth.signInWithPopup.and.returnValue(of());

      populate();
      service.loginWithGoogle();

      expect(afAuthSpy.auth.signInWithPopup).toHaveBeenCalled();
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
});
