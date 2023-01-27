import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICharacter} from "../interfaces";
import * as url from "url";
import {urls} from "../configs";

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
 randomCarouselIds:Array<number> = []

  constructor(private httpClient:HttpClient) {
  }

  setCarouselIds(ids: Array<number>): void {
    this.randomCarouselIds = ids
  };

 getRandomCharacters():Observable<ICharacter[]> {
   return this.httpClient.get<ICharacter[]>(urls.characters + '/' + this.randomCarouselIds)
 }

 cleanRandomIds():void{
   this.randomCarouselIds = []
 }
}
