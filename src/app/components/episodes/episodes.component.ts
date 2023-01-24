import {Component, OnInit} from '@angular/core';
import {IEpisode, IPaginated} from "../../interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs";
import {CheckboxService, MultipleComponentsService} from "../../services";

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit {
  episodes: IEpisode[];
  total_pages: number;
  isVisible: boolean = false;
  allSelectedIds: Array<number> = []

  constructor(private activatedRoute: ActivatedRoute,
              private multipleComponentsService: MultipleComponentsService,
              private router: Router,
              private checkboxService: CheckboxService) {
    this.cleanList()
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      map(value => value['data'] as IPaginated<IEpisode>)
    ).subscribe((value) => {
      this.episodes = value.results
      this.total_pages = value.info.count
    });
    this.multipleComponentsService.isEmpty()
      .subscribe((value) => this.isVisible = value)
  }

  selected() {
    let multipleIds = this.multipleComponentsService.getIds()
    if (multipleIds.length === 1) {
      const url = `episodes/${multipleIds.toString()}`
      this.router.navigate([url]);
    } else {
      const multipleUrl = `episodes/multiple/${multipleIds.toString()}`;
      this.router.navigate([multipleUrl]);
      this.checkboxService.disable.isAllChecked()
    }
  };

  cleanList() {
    this.multipleComponentsService.cleanIds()
    this.checkboxService.disable.isChecked()
    this.isVisible = false
    this.checkboxService.disable.isAllChecked()
  };

  selectAll() {
    this.checkboxService.enable.isAllChecked()
    this.multipleComponentsService.cleanIds()
    this.episodes.map(value => this.allSelectedIds.push(value.id))
    this.multipleComponentsService.setManyIds(this.allSelectedIds)
  };
}
