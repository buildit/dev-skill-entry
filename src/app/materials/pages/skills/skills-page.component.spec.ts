import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsPageComponent } from './skills-page.component';
import {SkillCardComponent } from '../../molecules/skill-card/skill-card.component';
import {MatCardModule, MatSliderModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

describe('SkillsPageComponent', () => {
  let component: SkillsPageComponent;
  let fixture: ComponentFixture<SkillsPageComponent>;

  beforeEach(async(() => {
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
});
