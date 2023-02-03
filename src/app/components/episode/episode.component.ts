import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

import {IEpisode} from "../../interfaces";
import {Router} from "@angular/router";
import {
  CheckboxService,
  MultipleComponentsService,
  SingleComponentService,
  TotalService
} from "../../services";

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent implements OnInit, AfterViewInit {
  @Input()
  episode: IEpisode;

  singleEpisode: IEpisode;
  selectedId: number | undefined;
  classActive: boolean;
  panelOpenState: boolean = false;

  constructor(private router: Router,
              private singleComponentService: SingleComponentService,
              private totalService: TotalService,
              private checkboxService: CheckboxService,
              private multipleComponentsService: MultipleComponentsService) {
  };

  ngOnInit(): void {
    this.checkboxService.isChecked().subscribe(value => {
      if (value === false) {
        this.selectedId = undefined;
        this.multipleComponentsService.removeId(this.episode.id);
        this.multipleComponentsService.cleanIds()
        this.classActive = value
      }
    });

    this.checkboxService.isAllChecked().subscribe(value => {
      if (value === true) {
        this.selectedId = this.episode.id;
        this.classActive = value
      }
    });
  };

  ngAfterViewInit(): void {
    this.multipleComponentsService.getIds().map((value) => {
      if (value === this.episode.id) {
        this.selectedId = value;
        this.classActive = true;
        this.checkboxService.enable.isChecked()
      }
    });
  };

  submit(): void {
    this.singleComponentService.setSingleInfo.episode(this.episode)
    this.router.navigate([`episodes/${this.episode.id}`])
  };

  select() {
    const id = this.episode.id;
    if (!this.selectedId) {
      this.checkboxService.enable.isChecked()
      this.classActive = true;
      this.selectedId = id;
      this.multipleComponentsService.setId(this.selectedId);
    } else if (this.selectedId) {
      this.classActive = false;
      this.selectedId = undefined;
      this.multipleComponentsService.removeId(id);
      this.checkboxService.disable.isAllChecked()
    }
  };
}
