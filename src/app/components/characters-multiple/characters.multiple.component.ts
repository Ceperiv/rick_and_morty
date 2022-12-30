import {Component, OnInit} from '@angular/core';

import {MultipleComponentsService} from "../../services";
import {ICharacter} from "../../interfaces";

@Component({
  selector: 'app-characters-multiple',
  templateUrl: './characters.multiple.component.html',
  styleUrls: ['./characters.multiple.component.scss']
})
export class CharactersMultipleComponent implements OnInit {
  characters: ICharacter[];

  constructor(private multipleComponentsService: MultipleComponentsService) { }

  ngOnInit(): void {
    this.multipleComponentsService.getComponentsById.characters()
      .subscribe((value) =>
        this.characters = value
      )
  }
}
