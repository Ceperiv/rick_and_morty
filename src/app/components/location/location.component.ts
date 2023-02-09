import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {ILocation} from "../../interfaces";
import {CheckboxService, MultipleComponentsService, SingleComponentService, TotalService} from "../../services";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  @Input()
  location: ILocation

  selectedId: number | undefined;
  classActive: boolean;

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
        this.multipleComponentsService.removeId(this.location.id);
        this.multipleComponentsService.cleanIds()
        this.classActive = value
      }
    });

    this.checkboxService.isAllChecked().subscribe(value => {
      if (value) {
        this.multipleComponentsService.getIds().map(value => {
          if (this.location.id === value) {
            this.selectedId = this.location.id;
            this.classActive = true
          }
        })
      }
    });
  };

  submit(): void {
    this.singleComponentService.setSingleInfo.location(this.location)
    this.router.navigate([`locations/${this.location.id}`])
  };

  select() {
    const id = this.location.id;
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
