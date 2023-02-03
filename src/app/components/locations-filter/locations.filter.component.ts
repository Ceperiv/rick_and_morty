import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {ILocationFilter, IPageError} from "../../interfaces";
import {QueryParamsService, TotalService} from "../../services";

@Component({
  selector: 'app-locations-filter',
  templateUrl: './locations.filter.component.html',
  styleUrls: ['./locations.filter.component.scss']
})
export class LocationsFilterComponent implements OnInit, AfterViewInit{
  name: boolean = false;
  status: boolean = false;
  form: FormGroup;
  params: ILocationFilter;
  toggleFilterBlock: boolean = false;
  errorStatus: boolean = false
  error: IPageError


  constructor(private router: Router,
              private totalService: TotalService,
              private activatedRoute: ActivatedRoute,
              private queryParamsService: QueryParamsService) {
    this._initForm()
  };

  ngOnInit(): void {

  };

  _initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      type: new FormControl(''),
      dimension: new FormControl(''),
    })
  };

  ngAfterViewInit(): void {
    this.activatedRoute.queryParams.subscribe(({name, type, dimension}) => {
      this.form = new FormGroup({
        name: new FormControl(name),
        type: new FormControl(type),
        dimension: new FormControl(dimension),
      })
    })
  };

  submit() {
    this.errorStatus = false
    this.params = this.form.value
    this.router.navigate([], {queryParams: this.params})
      .catch((e) => {
        this.errorStatus = true
        this.error = {message: e.error.error, status: e.status}
      })
  };


  toggleFilter() {
    this.toggleFilterBlock = !this.toggleFilterBlock
  }

  cleanFilter() {
    this.form = new FormGroup({
      name: new FormControl(''),
      type: new FormControl(''),
      dimension: new FormControl(''),
    })
    this.router.navigate(['/episodes'])
  }
}
