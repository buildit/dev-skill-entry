import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { AngularFirestore } from '@angular/fire/firestore';

import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

describe('DatabaseService', () => {
  let service: DatabaseService;
  let afStoreSpy: SpyObj<any>;

  const uid = '1234';

  const skillSet = {
    0: [
      {
        id: 'angular2',
        value: 2,
      },
      {
        id: 'vue',
        value: 5,
      },
      {
        id: 'react',
        value: 8,
      },
    ],
  };

  function populate() {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFirestore,
          useValue: afStoreSpy,
        },
      ],
    });

    service = TestBed.get(DatabaseService);
  }

  beforeEach(() => {
    afStoreSpy = createSpyObj('afStoreSpy', ['collection', 'doc', 'update', 'set', 'get']);

    afStoreSpy.collection.and.returnValue(afStoreSpy);
    afStoreSpy.doc.and.returnValue(afStoreSpy);
    afStoreSpy.update.and.returnValue(afStoreSpy);
    afStoreSpy.get.and.returnValue(afStoreSpy);
    afStoreSpy.set.and.returnValue(afStoreSpy);
  });

  it('should be created', () => {
    populate();
    expect(service).toBeTruthy();
  });

  describe('Set Skills', () => {
    it('should set skills in the database when setSkills is called', () => {
      populate();

      service.setSkills(uid, skillSet);

      expect(afStoreSpy.collection).toHaveBeenCalled();
    });
  });

  describe('Get Skills', () => {
    it('should be able to get skills from the database', () => {
      populate();

      service.getSkills(uid);

      expect(afStoreSpy.collection).toHaveBeenCalled();
    });
  });

  describe('Set User', () => {
    it('should be able to set user in the database ', () => {
      populate();

      const userInfo = {
        displayName: 'Spencer Hilvitz',
        email: 'spencerhilvitz@gmail.com',
        uid: 'I4EbE9qJCeQLSRcnNRgz7J2ncVG2',
      };

      service.setUser(userInfo);

      expect(afStoreSpy.collection).toHaveBeenCalled();
    });
  });

  describe('Get User', () => {
    it('should be able to get user from the database', () => {
      populate();

      const userInfo = {
        displayName: 'Spencer Hilvitz',
        email: 'spencerhilvitz@gmail.com',
        uid: 'I4EbE9qJCeQLSRcnNRgz7J2ncVG2',
      };

      service.getUser(userInfo);

      expect(afStoreSpy.collection).toHaveBeenCalled();
    });
  });
});
