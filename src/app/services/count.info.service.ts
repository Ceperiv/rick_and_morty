import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable} from "rxjs";
import {ICharacter, IEpisode, ILocation, IPaginated} from "../interfaces";
import {urls} from "../configs";

@Injectable({
  providedIn: 'root'
})
export class CountInfoService {
  countInfo: number = 5555

  constructor(private httpClient: HttpClient) {

  }

  getTotalInfo(): void {

    this.httpClient.get<IPaginated<ICharacter[]>>(urls.characters)
      .subscribe(value => {
        console.log(value.info.count)
        this.countInfo = value.info.count
      })
    // this.httpClient.get<IPaginated<IEpisode[]>>(urls.episodes)
    //   .subscribe(value => this.countInfo.locations = value.info.count)
    // this.httpClient.get<IPaginated<ILocation[]>>(urls.locations)
    //   .subscribe(value => this.countInfo.locations = value.info.count)
    // console.log(this.countInfo)
  }

  getCountInfo(): {} {
    return this.countInfo
  }
}
