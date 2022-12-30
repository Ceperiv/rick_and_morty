import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {SingleComponentService, TotalService} from "../../services";
import {IEpisode} from "../../interfaces";
import {IPageError} from "../../interfaces";

@Component({
  selector: 'app-character-single',
  templateUrl: './episode,single.component.html',
  styleUrls: ['./episode.single.component.scss']
})
export class EpisodeSingleComponent implements OnInit, AfterViewInit {
  singleComponent: IEpisode;
  error: IPageError;
  id: number;
  characterUrls: Array<string> = []

  constructor(private singleComponentService: SingleComponentService,
              private activatedRoute: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              private totalService: TotalService) {
  }

  ngOnInit(): void {
    this.singleComponent = this.singleComponentService.getSingleInfo.episode()

    this.activatedRoute.params.subscribe(({id}) => {
      this.id = this.singleComponent?.id

      if (!this.id) {
        this.totalService.getById.episodes(id).subscribe({

          next: (value) => {
            this.singleComponent = value
          },

          error: (error) => this.error = {message: error.error.error, status: error.status}
        })
      }
    })
  }

  ngAfterViewInit(): void {
    this.singleComponent.characters.map(value => {
      const characterId = value.split('/').splice(-1).toString()
      const characterUrl = `/characters/${characterId ? characterId : ''}`
      this.characterUrls.push(characterUrl)
    })
  }
}