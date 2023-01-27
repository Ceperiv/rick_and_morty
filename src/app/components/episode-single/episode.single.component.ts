import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {SingleComponentService, TotalService} from "../../services";
import {IEpisode} from "../../interfaces";
import {IPageError} from "../../interfaces";

@Component({
  selector: 'app-episode-single',
  templateUrl: './episode.single.component.html',
  styleUrls: ['./episode.single.component.scss']
})
export class EpisodeSingleComponent implements OnInit, AfterViewInit {
  singleComponent: IEpisode;
  error: IPageError;
  id: number;
  characterUrls: Array<string> = [];
  panelOpenState: boolean = false;

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
        this.totalService.getById.episode(id).subscribe({

          next: (value) => {
            this.singleComponent = value
          },

          error: (error) => this.error = {message: error.error.error, status: error.status}
        })
      }
    })
  }

  ngAfterViewInit(): void {

  }
}
