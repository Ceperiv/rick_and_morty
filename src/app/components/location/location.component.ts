import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

import {ILocation} from "../../interfaces";
import {SingleComponentService, TotalService} from "../../services";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {
  @Input()
  location:ILocation

  singleLocation: ILocation
  id: number

  constructor(private router:Router,
              private singleComponentService:SingleComponentService,
              private totalService:TotalService) {
  };

  submit():void{
    this.id = this.location.id
    this.totalService.getById.location(this.id).subscribe((value) => {
        this.singleLocation = value
        console.log(this.singleLocation, this.id)
        this.singleComponentService.setSingleInfo.location(this.singleLocation)
        this.router.navigate([`locations/${this.id}`])
      }
    );
  }
}
