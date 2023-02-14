import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

import {IEpisodeFilter, IPageError} from "../../interfaces";
import {TotalService} from "../../services";

@Component({
  selector: 'app-episodes-filter',
  templateUrl: './episodes.filter.component.html',
  styleUrls: ['./episodes.filter.component.scss']
})

export class EpisodesFilterComponent implements OnInit, AfterViewInit {
  name: boolean = false;
  status: boolean = false;
  form: FormGroup;
  params: IEpisodeFilter;
  toggleFilterBlock: boolean = false;
  errorStatus: boolean = false
  error: IPageError;

  constructor(private router: Router,
              private totalService: TotalService,
              private activatedRoute: ActivatedRoute) {
    this._initForm();
  };

  ngOnInit(): void {
  };

  _initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      episode: new FormControl(''),
    });
  };

  ngAfterViewInit(): void {
    this.activatedRoute.queryParams.subscribe(({page, name, episode}) => {
      this.form = new FormGroup({
        name: new FormControl(name),
        episode: new FormControl(episode),
      });
    });
  };

  submit() {
    this.errorStatus = false
    this.params = this.form.value
    this.router.navigate([], {queryParams: this.params})
      .catch((e) => {
        this.errorStatus = true
        this.error = {message: e.error.error, status: e.status}
      });
  };


  toggleFilter() {
    this.toggleFilterBlock = !this.toggleFilterBlock
  };

  cleanFilter() {
    this.form = new FormGroup({
      name: new FormControl(''),
      episode: new FormControl(''),
    });
    this.router.navigate(['/episodes'])
  };
}
