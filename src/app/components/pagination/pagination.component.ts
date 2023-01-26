import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {Observable} from "rxjs";

import {QueryParamsService} from "../../services";
import {IQueryParams} from "../../interfaces";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, AfterViewInit {
  @Input()
  total_pages: number

  @ViewChild(MatPaginator)
  paginator: MatPaginator

  page: number
  params: Observable<IQueryParams>


  constructor(private activatedRoute: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              private router: Router,
              private queryParamsService: QueryParamsService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.activatedRoute.queryParams.subscribe(({page}) => {
      this.paginator.pageIndex = page - 1;
      this.changeDetectorRef.detectChanges()
      this.page = page
    });
    this.paginator.page.subscribe((page) => {
      this.params = this.queryParamsService.getQueryParams()
      this.router.navigate([], {queryParams: {...this.params, page: page.pageIndex + 1}})

    })
  }
}
