import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {TotalService} from "../total.service";
import {
  ICharacter,
  ICharacterFilter,
  IEpisode,
  IEpisodeFilter,
  ILocation,
  ILocationFilter,
  IPaginated
} from "../../interfaces";
import {QueryParamsService} from "../query.params.service";

@Injectable({
  providedIn: 'root'
})
export class TotalResolver implements Resolve <IPaginated<ICharacter | IEpisode | ILocation>> {

  data: Observable<IPaginated<ICharacter | IEpisode | ILocation>>;
  characterParams: ICharacterFilter;
  episodeParams: IEpisodeFilter;
  locationParams: ILocationFilter;

  constructor(private totalService: TotalService,
              private router: Router,
              private queryParamsService: QueryParamsService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<IPaginated<ICharacter | IEpisode | ILocation>> {
    const page = route?.queryParams['page'] || '';
    const name = route?.queryParams['name'] || '';
    const status = route?.queryParams['status'] || '';
    const species = route?.queryParams['species'] || '';
    const type = route?.queryParams['type'] || '';
    const gender = route?.queryParams['gender'] || '';
    const episode = route?.queryParams['episode'] || '';
    const dimension = route?.queryParams['dimension'] || '';


    this.characterParams = this.getClearData({page, name, status, species, type, gender})
    this.episodeParams = this.getClearData({page, name, episode})
    this.locationParams = this.getClearData({page, name, type, dimension})


    switch (route.url[0].path) {
      case 'characters':
        this.queryParamsService.setQueryParams(this.characterParams)
        return this.data = this.totalService.getAll.characters(this.characterParams);
        break;
      case 'episodes':
        this.queryParamsService.setQueryParams(this.episodeParams)
        return this.data = this.totalService.getAll.episodes(this.episodeParams);
        break;
      case 'locations':
        this.queryParamsService.setQueryParams(this.locationParams)
        return this.data = this.totalService.getAll.locations(this.locationParams);
        break;

    }
    return this.data
  }

  getClearData(obj: any) {
    for (let key in obj) {
      if (obj[key] === '') {
        delete obj[key]
      }
    }
    return obj
  }
}
