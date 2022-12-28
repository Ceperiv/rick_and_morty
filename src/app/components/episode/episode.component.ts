import {Component, Input} from '@angular/core';

import {ICharacter, IEpisode} from "../../interfaces";
import {Router} from "@angular/router";
import {SingleComponentService, TotalService} from "../../services";

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent {
  @Input()
  episode:IEpisode;

  singleEpisode: IEpisode
  id: number

  constructor(private router:Router,
              private singleComponentService:SingleComponentService,
              private totalService:TotalService) {
  };

  submit():void{
    this.id = this.episode.id
    this.totalService.getById.episodes(this.id).subscribe((value) => {
        this.singleEpisode = value
        this.singleComponentService.setSingleInfo.episode(this.singleEpisode)
        this.router.navigate([`episodes/${this.id}`])
      }
    );
  }
}
