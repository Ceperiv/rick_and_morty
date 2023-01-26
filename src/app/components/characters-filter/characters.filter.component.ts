import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

import {ICharacterFilter} from "../../interfaces";
import {QueryParamsService, TotalService} from "../../services";

@Component({
  selector: 'app-characters-filter',
  templateUrl: './characters.filter.component.html',
  styleUrls: ['./characters.filter.component.scss']
})

export class CharactersFilterComponent implements OnInit, AfterViewInit {
  name: boolean = false;
  status: boolean = false;
  form: FormGroup;
  params: ICharacterFilter;
  toggleFilterBlock: boolean = false;

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
      status: new FormControl(''),
      species: new FormControl(''),
      type: new FormControl(''),
      gender: new FormControl(''),
    })
  };

  ngAfterViewInit(): void {
    this.activatedRoute.queryParams.subscribe(({page, name, status, species, type, gender}) => {
      this.form = new FormGroup({
        name: new FormControl(name),
        status: new FormControl(status),
        species: new FormControl(species),
        type: new FormControl(type),
        gender: new FormControl(gender),
      })
    })
  };

  submit() {
    this.params = this.form.value
    this.router.navigate([], {queryParams: this.params})
    // this.queryParamsService.setQueryParams(this.form.value)
  };


  toggleFilter() {
    this.toggleFilterBlock = !this.toggleFilterBlock
  }

  cleanFilter() {
    this.form = new FormGroup({
      name: new FormControl(''),
      status: new FormControl(''),
      species: new FormControl(''),
      type: new FormControl(''),
      gender: new FormControl(''),
    })
    this.router.navigate(['/characters'])
  }
}
