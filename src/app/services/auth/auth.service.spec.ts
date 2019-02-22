import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import {of} from 'rxjs';

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
    };
  });

  it('should be created', () => {
    populate();
    expect(service).toBeTruthy();
  });

  describe('login method', () => {
    it('should trigger the AngularFireAuth popup', () => {
      afAuthSpy.auth.signInWithPopup.and.returnValue(of());

      populate();
      service.login();

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

  describe('user property', () => {
    it('should return a user if a currrentUser is present', () => {
      afAuthSpy.auth.currentUser = {};

      populate();

      expect(service.user).toBeTruthy();
    });
  });

  describe('loggedIn property', () => {
    it('should return true if there is a user', () => {
      afAuthSpy.auth.currentUser = {};

      populate();

      expect(service.loggedIn).toBeTruthy();
    });

    it('should return false if there is not a user', () => {
      afAuthSpy.auth.currentUser = null;

      populate();

      expect(service.loggedIn).toBeFalsy();
    });
  });
});
