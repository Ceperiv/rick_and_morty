import {Injectable} from '@angular/core';
import {Observable} from "rxjs";

import {IQueryParams} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService {

  queryParams: Observable<IQueryParams>

  setQueryParams(params: Observable<IQueryParams> | any): void {
    this.queryParams = params
  };

  getQueryParams(): Observable<IQueryParams> {
    return this.queryParams
  };

}
