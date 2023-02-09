import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {IEpisode} from "../../interfaces";
import {CheckboxService, MultipleComponentsService, SingleComponentService, TotalService} from "../../services";

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent implements OnInit {
  @Input()
  episode: IEpisode;

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
      if (!value) {
        this.selectedId = undefined;
        this.multipleComponentsService.removeId(this.episode.id);
        this.multipleComponentsService.cleanIds()
        this.classActive = value
      }
    });

    this.checkboxService.isAllChecked().subscribe(value => {
      if (value) {
        this.multipleComponentsService.getIds().map(value => {
          if (this.episode.id === value) {
            this.selectedId = this.episode.id;
            this.classActive = true
          }
        })
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
