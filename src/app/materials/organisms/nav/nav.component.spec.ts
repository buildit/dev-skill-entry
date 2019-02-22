import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import {of} from 'rxjs';
import { Router } from '@angular/router';
import { MatIconModule, MatToolbarModule } from '@angular/material';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let authServiceSpy: SpyObj<AuthService>;
  let spyRouter: SpyObj<Router>;

  beforeEach(async(() => {
    authServiceSpy = createSpyObj(['login', 'logout']);
    authServiceSpy.login.and.returnValue(of({}));
    authServiceSpy.logout.and.returnValue(of({}));

    spyRouter = createSpyObj(['navigate']);

    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatToolbarModule,
      ],
      declarations: [ NavComponent ],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
        {
          provide: Router,
          useValue: spyRouter,
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login method', () => {
    it('should call login', () => {
      component.login();
      expect(authServiceSpy.login).toHaveBeenCalled();
    });

    it('should redirect to the user index', () => {
      component.login();
      expect(spyRouter.navigate).toHaveBeenCalledWith(['/users']);
    });
  });

  describe('logout method', () => {
    it('should call logout', () => {
      component.logout();
      expect(authServiceSpy.logout).toHaveBeenCalled();
    });
  });
});
