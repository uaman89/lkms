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
  MdInputModule
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
    MdInputModule
  ],

  declarations: []
})
export class MaterialModule {
}
