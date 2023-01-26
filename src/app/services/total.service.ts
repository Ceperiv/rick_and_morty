import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {urls} from "../configs";
import {
  ICharacter,
  ICharacterFilter,
  IEpisode,
  IEpisodeFilter,
  ILocation,
  ILocationFilter,
  IPaginated
} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class TotalService {

  constructor(private httpClient: HttpClient) {
  }

  getTotalInfo = {
    characters: (): Observable<IPaginated<ICharacter>> => {
      return this.httpClient.get<IPaginated<ICharacter>>(urls.characters)
    }
  }

  getAll = {
    characters: (params: ICharacterFilter | any): Observable<IPaginated<ICharacter>> => {
      return this.httpClient.get<IPaginated<ICharacter>>(urls.characters, {params})
    },
    episodes: (params: IEpisodeFilter | any): Observable<IPaginated<IEpisode>> => {
      return this.httpClient.get<IPaginated<IEpisode>>(urls.episodes, {params})
    },
    locations: (params: ILocationFilter | any): Observable<IPaginated<ILocation>> => {
      return this.httpClient.get<IPaginated<ILocation>>(urls.locations, {params})
    }
  };

  getById = {
    character: (id: number): Observable<ICharacter> => {
      return this.httpClient.get<ICharacter>(urls.characters + '/' + id)
    },
    episode: (id: number): Observable<IEpisode> => {
      return this.httpClient.get<IEpisode>(urls.episodes + '/' + id)
    },
    location: (id: number): Observable<ILocation> => {
      return this.httpClient.get<ILocation>(urls.locations + '/' + id)
    }
  };
}

