import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";

import {ILocation, IPaginated} from "../../interfaces";

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit{
  locations: ILocation[];
  total_pages:number

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      map(value => value['data'] as IPaginated<ILocation>)
    ).subscribe((value) => {
      this.total_pages = value.info.count
      // console.log(this.total_pages)
      this.locations = value.results
    })
  }
}
