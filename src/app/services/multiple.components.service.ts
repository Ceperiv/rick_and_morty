import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {urls} from "../configs";
import {ICharacter} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class MultipleComponentsService {

  selectedIds: Array<number> = []
  private _isEmpty = new BehaviorSubject<boolean>(false)

  constructor(private httpClient: HttpClient) {
  }

  setId(id: number): void {
    this.selectedIds.push(id)
    if (this.selectedIds.length !== 0) {
      this._isEmpty.next(true)
    }
  };

  setManyIds(ids: Array<number>): void {
    this.selectedIds = ids
    if (this.selectedIds.length !== 0) {
      this._isEmpty.next(true)
    }
  };

  removeId(id: number) {
    const index = this.selectedIds.indexOf(id);
    this.selectedIds.splice(index, 1)
    if (this.selectedIds.length === 0) {
      this._isEmpty.next(false)
    }
  };

  cleanIds() {
    this.selectedIds = []
    this._isEmpty.next(false)
  };

  isEmpty(): Observable<boolean> {
    return this._isEmpty.asObservable()
  };

  getIds(): Array<number> {
    return this.selectedIds
  };

  getComponentsById = {
    characters: (): Observable<ICharacter[]> => {
      return this.httpClient.get<ICharacter[]>(urls.characters + '/' + this.selectedIds.toString())
    }
  };
}
