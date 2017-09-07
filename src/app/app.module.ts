import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';


import {AppComponent} from './app.component';
import {UserComponent} from './user/user.component';
import {UserListComponent} from './user-list/user-list.component';
import {appRoutes} from './app.routes';
import {MaterialModule} from './material.module';
import {ApiService} from './services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      // {enableTracing: true} // <-- debugging purposes only
    ),
    MaterialModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
