import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {urls} from "../configs";
import {ICharacter, IEpisode, ILocation, IPaginated} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class TotalService {

  constructor(private httpClient: HttpClient) {
  }

  getAll = {
    characters: (page = 1): Observable<IPaginated<ICharacter>> => {
      return this.httpClient.get<IPaginated<ICharacter>>(urls.characters, {params: {page}})
    },
    episodes: (page = 1): Observable<IPaginated<IEpisode>> => {
      return this.httpClient.get<IPaginated<IEpisode>>(urls.episodes, {params: {page}})
    },
    locations: (page = 1): Observable<IPaginated<ILocation>> => {
      return this.httpClient.get<IPaginated<ILocation>>(urls.locations, {params: {page}})
    }
  };

  getById = {
    characters: (id: number): Observable<ICharacter> => {
      return this.httpClient.get<ICharacter>(urls.characters + '/' + id)
    },
    episodes: (id: number): Observable<IEpisode> => {
      return this.httpClient.get<IEpisode>(urls.episodes + '/' + id)
    },
    locations: (id: number): Observable<ILocation> => {
      return this.httpClient.get<ILocation>(urls.locations + '/' + id)
    }
  };
}

