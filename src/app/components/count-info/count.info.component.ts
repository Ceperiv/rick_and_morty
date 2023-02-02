import {Component, OnInit} from '@angular/core';

import {CountInfoService} from "../../services";
import {ICountInfo} from "../../interfaces";

@Component({
  selector: 'app-count-info',
  templateUrl: './count.info.component.html',
  styleUrls: ['./count.info.component.scss']
})
export class CountInfoComponent implements  OnInit{
  countInfo: ICountInfo

  constructor(private countInfoService:CountInfoService) {
  }
  ngOnInit(): void {
    this.countInfoService.getCountInfo().then(value => this.countInfo = value);
  }

}
