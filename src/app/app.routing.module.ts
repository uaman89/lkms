import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from 'app/client-list/client-list.component';
import {UserComponent} from 'app/client/client.component';
import {ClientDetailResolver} from 'app/client/client.resolver.service';


export const appRoutes: Routes = [
  {path: 'client/list', component: UserListComponent},
  {path: 'client/:id', component: UserComponent, resolve: {data: ClientDetailResolver}},
  {path: '**', redirectTo: 'client/list'}
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ClientDetailResolver
  ]
})
export class AppRoutingModule {
}
