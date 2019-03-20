import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { AngularFirestore } from '@angular/fire/firestore';

import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

fdescribe('DatabaseService', () => {
  let service: DatabaseService;
  let afStoreSpy: SpyObj<any>;

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
    afStoreSpy = {
      collection: createSpyObj(['ref', 'query', 'afs']),
    };
  });

  it('should be created', () => {
    populate();
    expect(service).toBeTruthy();
  });
});
