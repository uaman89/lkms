import {Routes} from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {UserComponent} from './user/user.component';

export const appRoutes: Routes = [
  {path: 'user/list', component: UserListComponent},
  {path: 'hero/:id', component: UserComponent},
  {path: '**', redirectTo: 'user/list'}
];
