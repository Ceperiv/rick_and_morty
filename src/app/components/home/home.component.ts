import {Component, OnInit} from '@angular/core';
import {CountInfoService} from "../../services";
import {ICountInfo} from "../../interfaces";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  countInfo:ICountInfo
constructor(private countInfoService:CountInfoService) {
}

  ngOnInit(): void {
    this.countInfoService.getCountInfo().then(value => this.countInfo = value);
  }

}
