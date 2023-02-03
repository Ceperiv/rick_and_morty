import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {SingleComponentService, TotalService} from "../../services";
import {ILocation, IPageError} from "../../interfaces";

@Component({
  selector: 'app-location-single',
  templateUrl: './location.single.component.html',
  styleUrls: ['./location.single.component.scss']
})
export class LocationSingleComponent implements OnInit, AfterViewInit {
  @Input()
  singleComponent: ILocation;

  error: IPageError;
  id: number;
  residentsUrls: Array<string> = [];

  constructor(private singleComponentService: SingleComponentService,
              private activatedRoute: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              private totalService: TotalService) {
  };

  ngOnInit(): void {
    this.singleComponent = this.singleComponentService.getSingleInfo.location()

    this.activatedRoute.params.subscribe(({id}) => {
      this.id = this.singleComponent?.id

      if (!this.id) {
        this.totalService.getById.location(id).subscribe({
          next: (value) => {
            this.singleComponent = value
          },
          error: (error) => this.error = {message: error.error.error, status: error.status}
        });
      }
    });
  };

  ngAfterViewInit(): void {
  };
}
