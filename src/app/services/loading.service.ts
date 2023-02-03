import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _isLoading = new BehaviorSubject<boolean>(false);

  startLoading(): void {
    this._isLoading.next(true)
  };

  endLoading(): void {
    this._isLoading.next(false)
  };

  isLoading():Observable<boolean>{
    return this._isLoading.asObservable()
  };

}
