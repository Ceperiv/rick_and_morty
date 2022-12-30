import {Component, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";

import {LoadingService} from "../../services";

@Component({
  selector: 'app-main-layouts',
  templateUrl: './main-layouts.component.html',
  styleUrls: ['./main-layouts.component.scss']
})
export class MainLayoutsComponent implements OnInit {
  isLoading: boolean

  constructor(private loadingService: LoadingService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadingService.isLoading().subscribe(value => this.isLoading = value);
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.loadingService.startLoading()
      } else if (e instanceof NavigationEnd) {
        this.loadingService.endLoading()
      }
    })
  }
}
