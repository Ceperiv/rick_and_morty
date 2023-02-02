import {AfterContentInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {MultipleComponentsService} from "../../services";
import {ICharacter, IPageError} from "../../interfaces";

@Component({
  selector: 'app-characters-multiple',
  templateUrl: './characters.multiple.component.html',
  styleUrls: ['./characters.multiple.component.scss']
})
export class CharactersMultipleComponent implements OnInit, AfterContentInit {
  characters: ICharacter[] = [];
  ids: Array<number> = [];
  error: IPageError;

  constructor(private multipleComponentsService: MultipleComponentsService,
              private activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.multipleComponentsService.getComponentsById.characters()
      .subscribe(
        {
          next: (value) => {
            this.characters = value
            this.characters.map(value => {
              this.ids.push(value.id)
            })
            this.multipleComponentsService.cleanIds()
          },
          error: (e) => console.log(e)
        })
  }

  ngAfterContentInit(): void {
    this.activatedRoute.params.subscribe(({ids}) => {
      if (ids.length === 1) {
        this.error = {message: 'characters/multiple - cannot take one value... example(1,2,4,9)', status: 404}
      }
      if (!this.ids || this.ids.toString() !== ids.toString()) {
        this.ids = []
        this.multipleComponentsService.cleanIds()
        this.multipleComponentsService.setId(ids)
        this.multipleComponentsService.getComponentsById.characters()
          .subscribe(value => this.characters = value)
      }
    })
  }
}
