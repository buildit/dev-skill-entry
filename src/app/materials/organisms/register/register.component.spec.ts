import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { MatCardModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { of, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from 'src/app/services/auth/auth.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let routerSpy: SpyObj<Router>;
  let afAuthSpy: SpyObj<any>;
  let authServiceSpy: SpyObj<any>;

  beforeEach(async(() => {
    routerSpy = createSpyObj(['navigate']);

    afAuthSpy = {
      auth: createSpyObj(['createUserWithEmailAndPassword']),
      authState: of(Observable),
    };

    authServiceSpy = createSpyObj(['register']);
    authServiceSpy.register.and.returnValue(of({}));

    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
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
      ],
    })
    .compileComponents();
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

    expect(authServiceSpy.register).toHaveBeenCalledWith(form.value.email, form.value.password);
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
});
