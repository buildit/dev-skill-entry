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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
