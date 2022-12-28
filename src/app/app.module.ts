import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CharacterComponent} from './components';
import {CharactersComponent} from './components';
import {HeaderComponent} from './components';
import {LocationComponent} from './components';
import {LocationsComponent} from './components';
import {EpisodeComponent} from './components';
import {EpisodesComponent} from './components';
import {MainLayoutsComponent} from './layouts';
import {HttpClientModule} from "@angular/common/http";
import {RouterOutlet} from "@angular/router";
import {PaginationComponent} from './components';
import {MatPaginatorModule} from "@angular/material/paginator";
import {CustomErrorComponent} from './components';
import {Error404Component} from './components';
import {CharacterSingleComponent} from './components';
import {EpisodeSingleComponent} from "./components";
import {LocationSingleComponent} from "./components";

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    CharactersComponent,
    HeaderComponent,
    LocationComponent,
    LocationsComponent,
    EpisodeComponent,
    EpisodesComponent,
    MainLayoutsComponent,
    PaginationComponent,
    CustomErrorComponent,
    Error404Component,
    CharacterSingleComponent,
    EpisodeSingleComponent,
    LocationSingleComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterOutlet,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
