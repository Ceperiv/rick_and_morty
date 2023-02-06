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
  characterUrls: Array<string> = [];
  panelOpenState: boolean = false;

  constructor(private singleComponentService: SingleComponentService,
              private activatedRoute: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              private totalService: TotalService) {
  };

  ngOnInit(): void {
    if (!this.singleComponent) {
      this.singleComponent = this.singleComponentService.getSingleInfo.episode()
    }
  };

  ngAfterViewInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      if (!this.singleComponent || id !== this.singleComponent.id) {
        this.totalService.getById.episode(id).subscribe({
          next: (value) => {
            this.singleComponent = value
          },
          error: (e) => this.error = {message: e.error.error, status: e.status}
        });
      }
    });
  };
}
