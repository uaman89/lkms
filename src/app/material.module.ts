import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdTableModule,
  MdSortModule,
  MdPaginatorModule,
  MdToolbarModule,
  MdSelectModule,
  MdCardModule,
  MdInputModule,
  MdButtonModule,
  MdDialogModule,
  MdDatepickerModule, MdNativeDateModule,
  MdListModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    BrowserAnimationsModule,
    MdSortModule,
    MdTableModule,
    MdPaginatorModule,
    MdToolbarModule,
    MdSelectModule,
    MdCardModule,
    MdInputModule,
    MdButtonModule,
    MdDialogModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdListModule
  ],

  declarations: []
})
export class MaterialModule {
}
