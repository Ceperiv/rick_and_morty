import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutsComponent} from "./layouts"
import {
  CharactersComponent,
  CharacterSingleComponent,
  EpisodesComponent,
  EpisodeSingleComponent,
  LocationsComponent, LocationSingleComponent
} from "./components";
import {TotalResolver} from "./services";
import {Error404Component} from "./components";


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
      {
        path: 'episodes',
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        resolve: {data: TotalResolver},
        component: EpisodesComponent
      },
      {path: 'episodes/:id', component: EpisodeSingleComponent, pathMatch: 'full'},
      {
        path: 'locations',
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        resolve: {data: TotalResolver},
        component: LocationsComponent
      },
      {path: 'locations/:id', component: LocationSingleComponent, pathMatch: 'full'},
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
