import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {appRoutes} from './app.routes';
import {ApiService} from './services/api.service';

import {MaterialModule} from './material.module';

import {AppComponent} from './app.component';
import {UserComponent} from './user/user.component';
import {UserListComponent} from './user-list/user-list.component';
import {AddClientDialogComponent} from './user-list/add-client-dialog/add-client-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserListComponent,
    AddClientDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      // {enableTracing: true} // <-- debugging purposes only
    ),
    MaterialModule
  ],
  entryComponents: [AddClientDialogComponent],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
