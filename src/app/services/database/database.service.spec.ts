import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { AngularFirestore } from '@angular/fire/firestore';

import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import { of } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';

describe('DatabaseService', () => {
  let service: DatabaseService;
  let afStoreSpy: SpyObj<any>;
  let databaseServiceSpy: SpyObj<any>;
  let doc: SpyObj<any>;

  const uid = '1234';

  const setSkills = {
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
    databaseServiceSpy = createSpyObj(['setSkills', 'getSkills', 'setUser', 'getUser']);
    databaseServiceSpy.setSkills.and.returnValue(new Promise((reject, resolve) => {}));
    databaseServiceSpy.getSkills.and.returnValue(of());
    databaseServiceSpy.setUser.and.returnValue(new Promise((reject, resolve) => {}));
    databaseServiceSpy.getUser.and.returnValue(of());

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFirestore,
          useValue: afStoreSpy,
        },
        {
          provide: DatabaseService,
          useValue: databaseServiceSpy,
        },
      ],
    });

    service = TestBed.get(DatabaseService);
  }

  beforeEach(() => {
    afStoreSpy = createSpyObj(['collection']);
    afStoreSpy.collection.and.returnValue();
  });

  it('should be created', () => {
    populate();
    expect(service).toBeTruthy();
  });

  describe('Set Skills', () => {
    it('should set skills in the database when setSkills is called', () => {
      populate();

      service.setSkills(uid, setSkills);

      expect(databaseServiceSpy.setSkills).toHaveBeenCalled();
    });

    it('should call setSkills with an uid and skills object', () => {
      populate();

      service.setSkills(uid, setSkills);

      expect(databaseServiceSpy.setSkills).toHaveBeenCalledWith(uid, setSkills);
    });

    it('should return a promise when setSkills is called', () => {
      populate();

      service.setSkills(uid, setSkills)
        .then(resp => {
          expect(resp).toEqual(new Promise((resolve, reject) => {}));
        });
    });
  });

  describe('Get Skills', () => {
    it('should be able to get skills from the database', () => {
      populate();

      service.getSkills(uid);

      expect(databaseServiceSpy.getSkills).toHaveBeenCalled();
    });

    it('should call getSkills with a uid', () => {
      populate();

      service.getSkills(uid);

      expect(databaseServiceSpy.getSkills).toHaveBeenCalledWith(uid);
    });

    it('should return an Observable when getSkills is called', () => {
      populate();

      doc = {
        data: jasmine.createSpy('data').and.returnValue(of()),
      },

      service.getSkills(uid).subscribe((resp) => {
        expect(resp).toEqual(of());
      });
    });
  });

  describe('Set User', () => {
    it('should be able to set user in the database ', () => {
      populate();

      const userInfo = {
        displayName: 'Spencer Hilvitz',
        mail: 'spencerhilvitz@gmail.com',
        uid: 'I4EbE9qJCeQLSRcnNRgz7J2ncVG2',
      };

      service.setUser(userInfo);

      expect(databaseServiceSpy.setUser).toHaveBeenCalled();
    });

    it('should call setUser with userInfo', () => {
      populate();

      const userInfo = {
        displayName: 'Spencer Hilvitz',
        mail: 'spencerhilvitz@gmail.com',
        uid: 'I4EbE9qJCeQLSRcnNRgz7J2ncVG2',
      };

      service.setUser(userInfo);

      expect(databaseServiceSpy.setUser).toHaveBeenCalledWith(userInfo);
    });
  });

  describe('Get User', () => {
    it('should be able to get user from the database', () => {
      populate();

      const userInfo = {
        displayName: 'Spencer Hilvitz',
        mail: 'spencerhilvitz@gmail.com',
        uid: 'I4EbE9qJCeQLSRcnNRgz7J2ncVG2',
      };

      service.getUser(userInfo);

      expect(databaseServiceSpy.getUser).toHaveBeenCalled();
    });
  });
});
