import {AfterViewInit, Component, OnInit} from '@angular/core';
import {IEpisode, ILocation, IPageError} from "../../interfaces";
import {MultipleComponentsService} from "../../services";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-locations.multiple',
  templateUrl: './locations.multiple.component.html',
  styleUrls: ['./locations.multiple.component.scss']
})
export class LocationsMultipleComponent implements OnInit, AfterViewInit {
  locations: ILocation[];
  ids: Array<number> = [];
  error: IPageError;
  panelOpenState: boolean = false;

  constructor(private multipleComponentsService: MultipleComponentsService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.multipleComponentsService.getComponentsById.locations()
      .subscribe(
        {
          next: (value) => {
            this.locations = value
            this.locations?.map(value => {
              this.ids.push(value.id)
            })
            this.multipleComponentsService.cleanIds()
          },
          error: (e) => console.log(e)
        })
  }

  ngAfterViewInit(): void {
    this.activatedRoute.params.subscribe(({ids}) => {
      if (ids.length === 1) {
        this.error = {message: 'episodes/multiple cannot take single value... example(1,2,4,9)', status: 404}
      }
      if (!this.ids || this.ids.toString() !== ids.toString()) {
        this.ids = []
        this.multipleComponentsService.cleanIds()
        this.multipleComponentsService.setId(ids)
        this.multipleComponentsService.getComponentsById.locations()
          .subscribe(value => this.locations = value)
      }
    })

  }

}
