import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillCardComponent } from './skill-card.component';
import {MatCardModule, MatSliderModule} from '@angular/material';

describe('SkillCardComponent', () => {
  let component: SkillCardComponent;
  let fixture: ComponentFixture<SkillCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SkillCardComponent,
      ],
      imports: [
        MatCardModule,
        MatSliderModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillCardComponent);
    component = fixture.componentInstance;
    component.value = 5;
    component.title = 'ReactJS';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title value', () => {
    expect(fixture.nativeElement.querySelector('mat-card-title').innerText).toEqual('ReactJS');
  });

  it('should have a value value', () => {
    expect(fixture.nativeElement.querySelector('mat-card-subtitle').innerText).toEqual('Rating: 5');
  });

  it('should update value when there is a change event', () => {
    component.onChange({ value: 7 });

    expect(component.value).toEqual(7);
  });
});
