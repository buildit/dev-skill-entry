import {Routes} from '@angular/router';
import {HomeComponent} from './materials/pages/home/home.component';
import {UserIndexComponent} from './materials/pages/users/user-index/user-index.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        component: UserIndexComponent,
      }
    ],
  },
];
