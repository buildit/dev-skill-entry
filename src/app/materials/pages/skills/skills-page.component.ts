import { Component, OnInit } from '@angular/core';
import {ISkillDisplay } from '../../../models/i-skill-display';
import {skillList} from '../../../data/skill-list';

@Component({
  selector: 'app-p-skills',
  templateUrl: './skills-page.component.html',
  styleUrls: ['./skills-page.component.scss'],
})
export class SkillsPageComponent implements OnInit {
  skillList: ISkillDisplay[] = skillList;

  constructor() { }

  ngOnInit() {
  }
}
