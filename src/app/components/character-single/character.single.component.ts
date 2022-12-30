import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {SingleComponentService, TotalService} from "../../services";
import {ICharacter, IPageError} from "../../interfaces";

@Component({
  selector: 'app-character-single',
  templateUrl: './character.single.component.html',
  styleUrls: ['./character.single.component.scss']
})
export class CharacterSingleComponent implements OnInit, AfterViewInit {
  singleComponent: ICharacter;
  error: IPageError;
  id: number;
  originUrl: string;
  locationUrl: string
  episodeUrls: Array<string> = []

  constructor(private singleComponentService: SingleComponentService,
              private activatedRoute: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              private totalService: TotalService) {
  };

  ngOnInit(): void {
    this.singleComponent = this.singleComponentService.getSingleInfo.character();

    this.activatedRoute.params.subscribe(({id}) => {
      this.id = this.singleComponent?.id;

      if (!this.id) {
        this.totalService.getById.characters(id).subscribe({
          next: (value) => {
            this.singleComponent = value;
          },
          error: (error) => this.error = {message: error.error.error, status: error.status}
        });
      }
    });
  };

  ngAfterViewInit(): void {
    const originId = this.singleComponent.origin.url.split('/').slice(-1).toString();
    const locationId = this.singleComponent.location.url.split('/').slice(-1).toString();

    this.singleComponent.episode.map((value) => {
      const episodeId = value.split('/').slice(-1).toString();
      const episodeUrl = `/episodes/${episodeId ? episodeId : ''}`
      this.episodeUrls.push(episodeUrl);
    })
    this.originUrl = `/locations/${originId}`;
    this.locationUrl = `/locations/${locationId}`;
  };
}