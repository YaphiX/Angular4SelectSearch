import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdToolbarModule, MdButtonModule, MdButtonToggleModule, MdSidenavModule, MdSelectModule, MdInputModule, MdIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SearchComponent,OnChangesComponent } from './search/search.component'


@NgModule({
  declarations: [
    AppComponent, SearchComponent, OnChangesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdToolbarModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdSidenavModule,
    MdSelectModule,
    BrowserAnimationsModule,
    MdInputModule,
    MdIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
