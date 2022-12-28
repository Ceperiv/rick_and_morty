import {Component, OnInit} from '@angular/core';
import {IEpisode, IPaginated} from "../../interfaces";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit {
  episodes: IEpisode[]
  total_pages: number

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      map(value => value['data'] as IPaginated<IEpisode>)
    ).subscribe((value) => {
      this.episodes = value.results
      this.total_pages = value.info.count
    })
  }
}
