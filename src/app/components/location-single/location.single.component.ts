import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {SingleComponentService, TotalService} from "../../services";
import {ILocation, IPageError} from "../../interfaces";

@Component({
  selector: 'app-location-single',
  templateUrl: './location.single.component.html',
  styleUrls: ['./location.single.component.scss']
})
export class LocationSingleComponent implements OnInit, AfterViewInit {
  singleComponent: ILocation;
  error: IPageError;
  id: number;

  constructor(private singleComponentService: SingleComponentService,
              private activatedRoute: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              private totalService: TotalService) {
  }

  ngOnInit(): void {
    this.singleComponent = this.singleComponentService.getSingleInfo.location()

    this.activatedRoute.params.subscribe(({id}) => {
      this.id = this.singleComponent?.id

      if (!this.id) {
        this.totalService.getById.locations(id).subscribe({

          next: (value) => {
            this.singleComponent = value
          },

          error: (error) => this.error = {message: error.error.error, status: error.status}
        })
      }
    })
  }

  ngAfterViewInit(): void {

  }
}
