import {Routes} from '@angular/router';
import {HomeComponent} from './materials/pages/home/home.component';
import {UserIndexComponent} from './materials/pages/users/user-index/user-index.component';
import {SkillsPageComponent} from './materials/pages/skills/skills-page.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { LoginComponent } from './materials/organisms/login/login.component';
import { RegisterComponent } from './materials/organisms/register/register.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'users',
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: UserIndexComponent,
      },
      {
        path: 'skills',
        component: SkillsPageComponent,
      },
    ],
  },
];
