import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";

import {ICharacter, IPaginated} from "../../interfaces";

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  characters: ICharacter[] = [];
  total_pages: number;


  constructor(private activatedRoute: ActivatedRoute) {
  };

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      map(value => value['data'] as IPaginated<ICharacter>)
    ).subscribe((value) => {
      this.characters = value.results;
      this.total_pages = value.info.count;
    })
  };
}
