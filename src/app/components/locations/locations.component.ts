import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs";

import {ILocation, IPaginated} from "../../interfaces";
import {SingleComponentService} from "../../services";

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  locations: ILocation[];
  total_pages: number


  constructor(private activatedRoute: ActivatedRoute,
              private singleComponentService: SingleComponentService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      map(value => value['data'] as IPaginated<ILocation>)
    ).subscribe((value) => {
      this.total_pages = value.info.count
      this.locations = value.results
    })
  }

  submit(location: ILocation): void {
    this.singleComponentService.setSingleInfo.location(location)
    this.router.navigate([`locations/${location.id}`])
  }
}
