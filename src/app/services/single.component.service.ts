import {Injectable} from '@angular/core';

import {ICharacter, IEpisode, ILocation} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class SingleComponentService {
  private _singleCharacter: ICharacter
  private _singleEpisode: IEpisode
  private _singleLocation: ILocation

  setSingleInfo = {
    character: (singleCharacter: ICharacter): void => {
      this._singleCharacter = singleCharacter
    },
    episode: (singleEpisode: IEpisode): void => {
      this._singleEpisode = singleEpisode
    },
    location: (singleLocation: ILocation): void => {
      this._singleLocation = singleLocation
    },
  };

  getSingleInfo = {
    character: (): ICharacter => this._singleCharacter,
    episode: (): IEpisode => this._singleEpisode,
    location: (): ILocation => this._singleLocation,
  };
}
