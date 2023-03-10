import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {ILocation, IPageError} from "../../interfaces";
import {MultipleComponentsService} from "../../services";

@Component({
  selector: 'app-locations.multiple',
  templateUrl: './locations.multiple.component.html',
  styleUrls: ['./locations.multiple.component.scss']
})
export class LocationsMultipleComponent implements OnInit, AfterViewInit {
  locations: ILocation[];
  ids: Array<number> = [];
  error: IPageError;

  constructor(private multipleComponentsService: MultipleComponentsService,
              private activatedRoute: ActivatedRoute) {
  };

  ngOnInit(): void {
    if (!this.ids) {
      this.multipleComponentsService.getComponentsById.locations()
        .subscribe(
          {
            next: (value) => {
              this.locations = value
              this.locations?.map(value => {
                this.ids.push(value.id)
              });
              this.multipleComponentsService.cleanIds()
            },
            error: (e) => this.error = {message: e.error.error, status: e.status}
          });
    }
  };

  ngAfterViewInit(): void {
    this.activatedRoute.params.subscribe(({ids}) => {
      if (ids.length === 1) {
        this.error = {message: 'episodes/multiple - cannot take one value... example(1,2,4,9)', status: 500}
      }
      if (!this.ids || this.ids.toString() !== ids.toString()) {
        this.ids = []
        this.multipleComponentsService.cleanIds()
        this.multipleComponentsService.setId(ids)
        this.multipleComponentsService.getComponentsById.locations()
          .subscribe({
            next: value => {
              this.locations = value
            }, error: (e) => this.error = {message: e.error.error, status: e.status}
          })
      }
    });
  };
}
