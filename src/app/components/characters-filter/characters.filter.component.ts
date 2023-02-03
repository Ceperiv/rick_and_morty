import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

import {IPageError} from "../../interfaces";
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
      status: new FormControl(''),
      species: new FormControl(''),
      type: new FormControl(''),
      gender: new FormControl(''),
    })
  };

  ngAfterViewInit(): void {
    this.activatedRoute.queryParams.subscribe(
      {
        next: ({name, status, species, type, gender}) => {
          this.form = new FormGroup({
            name: new FormControl(name),
            status: new FormControl(status),
            species: new FormControl(species),
            type: new FormControl(type),
            gender: new FormControl(gender),
          })
        },
        error: (e) => console.log(e)
      })
  };

  submit() {
    this.errorStatus = false
    const params = this.getClearData(this.form.value)
    this.router.navigate([], {queryParams: params})
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
      status: new FormControl(''),
      species: new FormControl(''),
      type: new FormControl(''),
      gender: new FormControl(''),
    })
    this.router.navigate(['/characters'])
  }

  getClearData(obj: any) {
    for (let key in obj) {
      if (obj[key] === '' || obj[key] === null) {
        delete obj[key]
      }
    }
    return obj
  }

}
