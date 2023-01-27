import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutsComponent} from "./layouts"
import {
  CharactersComponent,
  CharacterSingleComponent,
  CharactersMultipleComponent,
  EpisodesComponent,
  EpisodeSingleComponent,
  Error404Component,
  LocationsComponent,
  LocationSingleComponent
} from "./components";
import {TotalResolver} from "./services";
import {EpisodesMultipleComponent} from "./components/episodes-multiple/episodes.multiple.component";
import {LocationsMultipleComponent} from "./components/locations-multiple/locations.multiple.component";


const routes: Routes = [

  {
    path: '', component: MainLayoutsComponent, children: [

      {
        path: 'characters',
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        resolve: {data: TotalResolver},
        component: CharactersComponent,
      },
      {path: 'characters/:id', component: CharacterSingleComponent},
      {path: 'characters/multiple/:ids', component: CharactersMultipleComponent},
      {
        path: 'episodes',
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        resolve: {data: TotalResolver},
        component: EpisodesComponent
      },
      {path: 'episodes/:id', component: EpisodeSingleComponent, pathMatch: 'full'},
      {path: 'episodes/multiple/:ids', component: EpisodesMultipleComponent},
      {
        path: 'locations',
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        resolve: {data: TotalResolver},
        component: LocationsComponent
      },
      {path: 'locations/:id', component: LocationSingleComponent, pathMatch: 'full'},
      {path: 'locations/multiple/:ids', component: LocationsMultipleComponent},
    ]
  },
  {path: '**', redirectTo: 'error404', title: '404', data: {error: 404}},
  {path: 'error404', data: {error: 404}, component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
