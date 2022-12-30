import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {
  MultipleComponentsService,
  SingleComponentService,
  TotalService
} from "../../services";
import {ICharacter} from "../../interfaces";

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit, AfterViewInit {
  @Input()
  character: ICharacter;

  singleCharacter: ICharacter;
  id: number;
  originUrl: string;
  locationUrl: string;
  episodeUrls: Array<string> = [];
  selectedId: number | undefined;
  classActive: boolean;

  constructor(private totalService: TotalService,
              private router: Router,
              private singleComponentService: SingleComponentService,
              private multipleComponentsService: MultipleComponentsService) {
  };

  submit(): void {
    this.id = this.character.id;
    this.totalService.getById.characters(this.id).subscribe((value) => {
        this.singleCharacter = value;
        this.singleComponentService.setSingleInfo.character(this.singleCharacter);
        this.router.navigate([`characters/${this.id}`]);
      }
    );
  };

  ngOnInit(): void {
    const originId = this.character.origin.url.split('/').slice(-1).toString();
    const locationId = this.character.location.url.split('/').slice(-1).toString();

    this.originUrl = `/locations/${originId}`;
    this.locationUrl = `/locations/${locationId}`;
  };

  selected() {
    const id = this.character.id;

    if (!this.selectedId) {
      this.selectedId = id;
      this.classActive = true;
      this.multipleComponentsService.setId(this.selectedId);
    } else if (this.selectedId) {
      this.classActive = false;
      this.selectedId = undefined;
      this.multipleComponentsService.removeId(id);
    }
  };

  ngAfterViewInit(): void {
    this.multipleComponentsService.getIds().map((value) => {
      if (value === this.character.id) {
        this.selectedId = value;
        this.classActive = true;
      }
    });
  };
}
