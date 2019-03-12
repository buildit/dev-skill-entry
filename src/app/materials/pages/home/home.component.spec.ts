import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {AuthService} from '../../../services/auth/auth.service';
import {of} from 'rxjs';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import {Router} from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authServiceSpy: SpyObj<AuthService>;
  let spyRouter: SpyObj<Router>;

  beforeEach(async(() => {
    authServiceSpy = createSpyObj(['loginWithEmail']);
    authServiceSpy.loginWithEmail.and.returnValue(of({}));

    spyRouter = createSpyObj(['navigate']);

    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Dev Skill Entry');
  });
});
