import { Component, OnInit } from '@angular/core';
import {ISkillDisplay } from '../../../models/i-skill-display';
import {skillList} from '../../../data/skill-list';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-p-skills',
  templateUrl: './skills-page.component.html',
  styleUrls: ['./skills-page.component.scss'],
})
export class SkillsPageComponent implements OnInit {
  skillList: ISkillDisplay[] = skillList;

  skillsForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor() { }

  ngOnInit() {
  }
}
