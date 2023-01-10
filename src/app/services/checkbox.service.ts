import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckboxService {

  private _isChecked = new BehaviorSubject<boolean>(true)
  private _isAllChecked = new BehaviorSubject<boolean>(false)

  disable = {
    isChecked: (): void => {
      this._isChecked.next(false)
    },
    isAllChecked: (): void => {
      this._isAllChecked.next(false)
    }
  };

  enable = {
    isChecked: (): void => {
      this._isChecked.next(true)
    },
    isAllChecked: (): void => {
      this._isAllChecked.next(true)
    }
  };

  isAllChecked(): Observable<boolean> {
    return this._isAllChecked.asObservable()
  };

  isChecked(): Observable<boolean> {
    return this._isChecked.asObservable()
  };
}
