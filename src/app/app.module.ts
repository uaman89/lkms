import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {ApiService} from './services/api.service';

import {MaterialModule} from './material.module';
import {AppRoutingModule} from './app.routing.module';

import {AppComponent} from './app.component';
import {UserComponent} from 'app/client/client.component';
import {UserListComponent} from 'app/client-list/client-list.component';
import {ClientDetailsDialogComponent} from 'app/client-details-dialog/client-details-dialog.component';
import {PageService} from './services/page.service';
import {GlobalErrorHandler} from './global-error-handler';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserListComponent,
    ClientDetailsDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
  ],
  entryComponents: [ClientDetailsDialogComponent],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    PageService,
    ApiService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
