import {AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements AfterViewInit {
  @Input()
  total_pages: number

  @ViewChild(MatPaginator)
  paginator: MatPaginator

  page:number

  constructor(private activatedRoute: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              private router: Router) {
  }

  ngAfterViewInit(): void {
    this.activatedRoute.queryParams.subscribe(({page}) => {
      this.paginator.pageIndex = page - 1;
      this.changeDetectorRef.detectChanges()
      this.page = page
    });
    this.paginator.page.subscribe((page) => {
      this.router.navigate([], {queryParams: {page: page.pageIndex + 1}})
    })
  }
}
