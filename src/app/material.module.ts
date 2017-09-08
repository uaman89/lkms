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
  MdDialogModule
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
    MdDialogModule
  ],

  declarations: []
})
export class MaterialModule {
}
