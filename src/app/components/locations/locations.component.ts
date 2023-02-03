import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs";

import {ILocation, IPaginated} from "../../interfaces";
import {CheckboxService, MultipleComponentsService} from "../../services";

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  locations: ILocation[];
  total_pages: number;
  isVisible: boolean = false;
  allSelectedIds: Array<number> = [];

  constructor(private activatedRoute: ActivatedRoute,
              private multipleComponentsService: MultipleComponentsService,
              private router: Router,
              private checkboxService: CheckboxService) {
    this.cleanList()
  };

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      map(value => value['data'] as IPaginated<ILocation>)
    ).subscribe((value) => {
      this.total_pages = value.info.count
      this.locations = value.results
    });
    this.multipleComponentsService.isEmpty()
      .subscribe((value) => this.isVisible = value)
  };

  selected() {
    let multipleIds = this.multipleComponentsService.getIds()
    if (multipleIds.length === 1) {
      const url = `locations/${multipleIds}`
      this.router.navigate([url]);
    } else {
      const multipleUrl = `locations/multiple/${multipleIds}`;
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
    this.locations.map(value => this.allSelectedIds.push(value.id))
    this.multipleComponentsService.setManyIds(this.allSelectedIds)
  };
}

