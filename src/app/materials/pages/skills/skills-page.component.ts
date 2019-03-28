import { Component, ViewChildren, QueryList, AfterViewInit, OnInit } from '@angular/core';
import { ISkillDisplay } from '../../../models/i-skill-display';
import { skillList } from '../../../data/skill-list';
import { FormGroup, NgForm } from '@angular/forms';
import { SkillCardComponent } from '../../molecules/skill-card/skill-card.component';
import { DatabaseService } from 'src/app/services/database/database.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-p-skills',
  templateUrl: './skills-page.component.html',
  styleUrls: ['./skills-page.component.scss'],
})
export class SkillsPageComponent implements OnInit {
  @ViewChildren(SkillCardComponent) components: QueryList<SkillCardComponent>;
  skillList: ISkillDisplay[] = skillList;

  skillsForm = new FormGroup({});

  fetchedSkills;

  get uid() {
    return this.authService.user.uid;
  }

  constructor(private data: DatabaseService,
              private authService: AuthService) {}

  ngOnInit() {
    this.getSkills();
  }


  setSkills() {
    const skills = this.components.toArray();
    const skillSet = [];
    const databaseObj = {};

    skills.forEach((component, i) => {
      const skill = skillList.filter((singleSkill: ISkillDisplay) => singleSkill.displayName === component.title);

      const newSkill = {
        id: skill[0].id,
        value: component.value,
      };

      skillSet.push(newSkill);
    });

    databaseObj[0] = skillSet;

    this.data.setSkills(this.uid, databaseObj)
      .then(doc => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
        } else {
          console.log('No such document!');
        }
      })
      .catch(err => console.error('Error getting document:', err));
  }

  getSkills() {
    this.data.getSkills(this.uid).subscribe((doc) => {
      if (doc.data().skillSet) {
        this.fetchedSkills = doc.data().skillSet[0];

        const skills = this.components.toArray();
        let filteredSkill;

        skills.forEach(componentSkill => {
          filteredSkill = skillList.filter(skill => skill.displayName === componentSkill.title);
          const updatedSkill = this.fetchedSkills.filter(skill => skill.id === filteredSkill[0].id);
          componentSkill.value = updatedSkill[0].value;
        });
      }
    });
  }
}
