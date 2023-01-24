import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {IQueryParams} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService {

  queryParams:Observable<IQueryParams>

  setQueryParams(params:Observable<IQueryParams> | any): void {
    this.queryParams = params
  };

  getQueryParams(): Observable<IQueryParams> {
    console.log(this.queryParams)
    return this.queryParams
  };

}
