import {AfterContentInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {MultipleComponentsService} from "../../services";
import {IEpisode, IPageError} from "../../interfaces";

@Component({
  selector: 'app-episodes-multiple',
  templateUrl: './episodes.multiple.component.html',
  styleUrls: ['./episodes.multiple.component.scss']
})
export class EpisodesMultipleComponent implements OnInit, AfterContentInit {
  episodes: IEpisode[] = [];
  ids: Array<number> = [];
  error: IPageError;
  panelOpenState: boolean = false;

  constructor(private multipleComponentsService: MultipleComponentsService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (!this.ids){
      this.multipleComponentsService.getComponentsById.episodes()
        .subscribe(
          {
            next: (value) => {
              this.episodes = value
              this.episodes.map(value => {
                this.ids.push(value.id)
              })
              this.multipleComponentsService.cleanIds()
            },
            error: (e) => console.log(e)
          })
    }
  }

  ngAfterContentInit(): void {
    this.activatedRoute.params.subscribe(({ids}) => {
      if (ids.length === 1) {
        this.error = {message: 'episodes/multiple - cannot take one value... example(1,2,4,9)', status: 404}
      }
      if (!this.ids || this.ids.toString() !== ids.toString()) {
        this.ids = []
        this.multipleComponentsService.cleanIds()
        this.multipleComponentsService.setId(ids)
        this.multipleComponentsService.getComponentsById.episodes()
          .subscribe(value => this.episodes = value)
      }
    })
  }
}

