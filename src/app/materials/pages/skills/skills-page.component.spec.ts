import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SkillsPageComponent } from './skills-page.component';
import {SkillCardComponent } from '../../molecules/skill-card/skill-card.component';
import {MatCardModule, MatSliderModule } from '@angular/material';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, Input } from '@angular/core';
import { DatabaseService } from 'src/app/services/database/database.service';
import { AuthService } from 'src/app/services/auth/auth.service';

describe('SkillsPageComponent', () => {
  let component: SkillsPageComponent;
  let fixture: ComponentFixture<SkillsPageComponent>;
  let databaseServiceSpy: SpyObj<any>;
  let doc: SpyObj<any>;
  let authServiceSpy: SpyObj<any>;
  let setSkillsSpy: SpyObj<any>;
  let resp: SpyObj<any>;
  let afAuthSpy: SpyObj<any>;
  const formGroup = FormGroup;
  let skillSet: SpyObj<any>;
  let data: SpyObj<any>;

  @Component({
    selector: 'app-skill-card',
    template: '<div></div>',
  })
  class MockSkillCardComponent {
    @Input() title: string;
    @Input() value: number;
  }

  beforeEach(async(() => {
    resp = {
      user: {
        displayName: 'Spencer',
        email: 'test@test.com',
        uid: '1234',
      },
    };

    const user = {
      uid: '1234',
    };

    afAuthSpy = {
      auth: createSpyObj(['signInWithPopup', 'signOut']),
      authState: of(user),
    };

    const store = {};
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
    };

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);

    skillSet = JSON.stringify([
        {
          id: 'angular2',
          value: 5,
        },
        {
          id: 'vue',
          value: 5,
        },
        {
          id: 'react',
          value: 5,
        },
      ]);

    data = {
      skillSet,
    };

    doc = {
      data: jasmine.createSpy('data').and.returnValue(data),
    },

    databaseServiceSpy = createSpyObj(['getSkills', 'setSkills']);
    databaseServiceSpy.getSkills.and.returnValue(of(doc));
    databaseServiceSpy.setSkills.and.returnValue(Promise.resolve());

    setSkillsSpy = {
      then: jasmine.createSpy('then').and.returnValue(user),
    };

    authServiceSpy = {
      user: jasmine.createSpy('user').and.returnValue(user),
    };

    TestBed.configureTestingModule({
      declarations: [
        SkillsPageComponent,
        SkillCardComponent,
      ],
      imports: [
        MatCardModule,
        MatSliderModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: AngularFireAuth,
          useValue: afAuthSpy,
        },
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
        {
          provide: FormGroup,
          useValue: formGroup,
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
    fixture = TestBed.createComponent(SkillsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a skillList', () => {
    expect(component.skillList).toEqual([
      {
        displayName: 'Angular 2+',
        id: 'angular2',
      },
      {
        displayName: 'Vue',
        id: 'vue',
      },
      {
        displayName: 'React',
        id: 'react',
      },
    ]);
  });

  describe('Set Skills', () => {
    it('should set skills in the database', () => {
      component.setSkills();

      expect(databaseServiceSpy.setSkills).toHaveBeenCalled();
    });

    it('should have an error if there is an error getting a document', (done) => {
      component.setSkills();

      databaseServiceSpy.setSkills.and.returnValue(Promise.reject('didn\'t work'));

      databaseServiceSpy.setSkills(resp.user.uid, skillSet)
        .catch(err => {
          expect(err).toEqual('didn\'t work');
          done();
        });
    });
  });

  describe('Get Skills', () => {
    it('should get skills from the database', () => {
      expect(databaseServiceSpy.getSkills).toHaveBeenCalled();
    });
  });

});
