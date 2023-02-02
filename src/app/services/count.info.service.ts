import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {ICharacter, ICountInfo, IEpisode, ILocation, IPaginated} from "../interfaces";
import {urls} from "../configs";
import {filter, interval, map, observable, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountInfoService {
  countInfo: ICountInfo

  constructor(private httpClient: HttpClient) {

  }

  loadCountInfo(): void {

    this.httpClient.get<IPaginated<ICharacter>>(urls.characters).subscribe(value => {
      this.countInfo = Object.assign({...this.countInfo, characters: value.info.count})

    });
    this.httpClient.get<IPaginated<IEpisode>>(urls.episodes).subscribe(value => {
      this.countInfo = Object.assign({...this.countInfo, episodes: value.info.count})

    });
    this.httpClient.get<IPaginated<ILocation>>(urls.locations).subscribe(value => {
      this.countInfo = Object.assign({...this.countInfo, locations: value.info.count})

    });

  }


  getCountInfo(): Promise<ICountInfo> {
    const promise: any = new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this.countInfo === undefined) {
          this.loadCountInfo()
        } else {
          resolve(this.countInfo)
          clearInterval(interval)
        }
      }, 1000)
    })
    return promise
  }
}
