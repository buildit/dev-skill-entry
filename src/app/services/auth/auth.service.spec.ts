import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import {of} from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let afAuthSpy: SpyObj<any>;

  beforeEach(() => {
    afAuthSpy = {
      auth: createSpyObj(['signInWithPopup']),
    };

    afAuthSpy.auth.signInWithPopup.and.returnValue(of());

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFireAuth,
          useValue: afAuthSpy,
        }
      ]
    });

    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login method', () => {
    it('should trigger the AngularFireAuth popup', () => {
      service.login();
      expect(afAuthSpy.auth.signInWithPopup).toHaveBeenCalled();
    });
  });
});
