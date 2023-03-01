import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
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
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {CharactersFilterComponent} from './components';
import {CharactersMultipleComponent} from './components';
import {FooterComponent} from './components';
import {ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatExpansionModule} from "@angular/material/expansion";
import {EpisodesFilterComponent} from "./components";
import { EpisodesMultipleComponent } from './components/episodes-multiple/episodes.multiple.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatStepperModule} from "@angular/material/stepper";
import { LocationsFilterComponent } from './components/locations-filter/locations.filter.component';
import { LocationsMultipleComponent } from './components/locations-multiple/locations.multiple.component';
import { CarouselComponent } from './layouts';
import { HomeComponent } from './components';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { CountInfoComponent } from './components/count-info/count.info.component';
import { SelectItemsComponent } from './components';

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
    CharactersFilterComponent,
    CharactersMultipleComponent,
    FooterComponent,
    EpisodesFilterComponent,
    EpisodesMultipleComponent,
    LocationsFilterComponent,
    LocationsMultipleComponent,
    CarouselComponent,
    HomeComponent,
    CountInfoComponent,
    SelectItemsComponent,
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        RouterOutlet,
        MatPaginatorModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatTreeModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatExpansionModule,
        MatMenuModule,
        MatStepperModule,
        MatProgressSpinnerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
