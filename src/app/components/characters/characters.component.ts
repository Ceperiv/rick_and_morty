import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs";

import {ICharacter, IPaginated} from "../../interfaces";
import {MultipleComponentsService} from "../../services";

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  characters: ICharacter[];
  total_pages: number;
  selectedCharactersId: number;
  isVisible: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private multipleComponentsService: MultipleComponentsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      map(value => value['data'] as IPaginated<ICharacter>)
    ).subscribe((value) => {
      this.characters = value.results;
      this.total_pages = value.info.count;
    })
    this.multipleComponentsService.isEmpty()
      .subscribe((value) => this.isVisible = value)
  }

  selected() {
    let multipleIds = this.multipleComponentsService.getIds()
    if (multipleIds.length === 1) {
      const url = this.router.url;
      this.router.navigate([`${url}/${multipleIds.toString()}`]);
    } else {
      const multipleUrl = `${this.router.url}/multiple/${multipleIds}`;
      this.router.navigate([multipleUrl]);
    }
  };
}