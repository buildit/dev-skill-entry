import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let authService: {authenticated: boolean};
  let routerSpy: SpyObj<Router>;

  function populate() {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    });

    service = TestBed.get(AuthGuardService);
  }


  beforeEach(() => {
    authService = {
      authenticated: true,
    };

    routerSpy = createSpyObj(['navigate']);
  });

  it('should be created', () => {
    populate();

    expect(service).toBeTruthy();
  });

  describe('canActivate method', () => {
    it('should return true if the user is authenticated', () => {
      populate();

      expect(service.canActivate(null, null)).toBeTruthy();
    });

    it('should return false if the user is not authenticated', () => {
      authService.authenticated = false;

      populate();

      expect(service.canActivate(null, null)).toBeFalsy();
    });

    it('should reroute to / if authenticated is false', () => {
      authService.authenticated = false;

      populate();
      service.canActivate(null, null);

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});
