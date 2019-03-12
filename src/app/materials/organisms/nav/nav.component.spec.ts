import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import {of} from 'rxjs';
import { Router } from '@angular/router';
import { MatIconModule, MatToolbarModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let authServiceSpy: SpyObj<AuthService>;
  let routerSpy: SpyObj<Router>;

  beforeEach(async(() => {
    authServiceSpy = createSpyObj(['login', 'logout']);
    authServiceSpy.logout.and.returnValue(of({}));

    routerSpy = createSpyObj(['navigate']);

    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatToolbarModule,
        ReactiveFormsModule,
      ],
      declarations: [ NavComponent ],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
        {
          provide: Router,
          useValue: routerSpy,
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
    it('should redirect to the login page', () => {
      component.login();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('logout method', () => {
    it('should call logout', () => {
      component.logout();
      expect(authServiceSpy.logout).toHaveBeenCalled();
    });
  });
});
