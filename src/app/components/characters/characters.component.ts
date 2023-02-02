import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs";

import {ICharacter, ICountInfo, IPaginated} from "../../interfaces";
import {CheckboxService, CountInfoService, MultipleComponentsService} from "../../services";

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit, AfterViewInit {
  characters: ICharacter[] = [];
  total_pages: number;
  selectedCharactersId: number;
  isVisible: boolean = false;
  allSelectedIds: Array<number> = []
  countInfo: ICountInfo

  constructor(private activatedRoute: ActivatedRoute,
              private multipleComponentsService: MultipleComponentsService,
              private router: Router,
              private checkboxService: CheckboxService,
              private countInfoService: CountInfoService) {
    this.cleanList()
  };

  ngOnInit(): void {

    this.activatedRoute.data.pipe(
      map(value => value['data'] as IPaginated<ICharacter>)
    ).subscribe((value) => {
      this.characters = value.results;
      this.total_pages = value.info.count;
    })
    this.multipleComponentsService.isEmpty()
      .subscribe((value) => this.isVisible = value)


  };

  selected() {
    let multipleIds = this.multipleComponentsService.getIds()
    if (multipleIds.length === 1) {
      const url = `characters/${multipleIds.toString()}`
      this.router.navigate([url]);
    } else {
      const multipleUrl = `characters/multiple/${multipleIds.toString()}`;
      this.router.navigate([multipleUrl]);
      this.checkboxService.disable.isAllChecked()
    }
  };

  cleanList() {
    this.multipleComponentsService.cleanIds()
    this.checkboxService.disable.isChecked()
    this.isVisible = false
    this.checkboxService.disable.isAllChecked()
  };

  selectAll() {
    this.checkboxService.enable.isAllChecked()
    this.multipleComponentsService.cleanIds()
    this.characters.map(value => this.allSelectedIds.push(value.id))
    this.multipleComponentsService.setManyIds(this.allSelectedIds)
  };

  ngAfterViewInit(): void {
    this.countInfoService.getCountInfo().then(value => this.countInfo = value);
  }

}
