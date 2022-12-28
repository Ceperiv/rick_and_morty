import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {TotalService} from "../total.service";
import {ICharacter, IEpisode, ILocation, IPaginated} from "../../interfaces";

@Injectable({
  providedIn: 'root'
})
export class TotalResolver implements Resolve <IPaginated<ICharacter | IEpisode | ILocation>> {

  data: Observable<IPaginated<ICharacter | IEpisode | ILocation>>

  constructor(private totalService: TotalService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<IPaginated<ICharacter | IEpisode | ILocation>> {
    const page = route.queryParams['page'];


    switch (route.url[0].path) {
      case 'characters':
        return this.data = this.totalService.getAll.characters(page);
        break;
      case 'episodes':
        return this.data= this.totalService.getAll.episodes(page);
        break;
      case 'locations':
        return this.data = this.totalService.getAll.locations(page);
        break;

    }

    return this.data


  }


}
