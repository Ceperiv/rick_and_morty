import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {
  CheckboxService,
  MultipleComponentsService,
  SingleComponentService,
  TotalService
} from "../../services";
import {ICharacter, IPageError} from "../../interfaces";

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
  error: IPageError;

  constructor(private totalService: TotalService,
              private router: Router,
              private singleComponentService: SingleComponentService,
              private multipleComponentsService: MultipleComponentsService,
              private checkboxService: CheckboxService) {
  };

  ngOnInit(): void {
    this.checkboxService.isChecked().subscribe(value => {
      if (value === false) {
        this.selectedId = undefined;
        this.multipleComponentsService.removeId(this.character.id);
        this.multipleComponentsService.cleanIds()
        this.classActive = value
      }
    });


    this.checkboxService.isAllChecked().subscribe(value => {
      if (value === true) {
        this.selectedId = this.character.id;
        this.classActive = value
      }
    });

    const originId = this.character.origin.url.split('/').slice(-1).toString();
    const locationId = this.character.location.url.split('/').slice(-1).toString();

    this.originUrl = `/locations/${originId}`;
    this.locationUrl = `/locations/${locationId}`;
  };

  ngAfterViewInit(): void {
    this.multipleComponentsService.getIds().map((value) => {
      if (value === this.character.id) {
        this.selectedId = value;
        this.classActive = true;
        this.checkboxService.enable.isChecked()
      }
    });
  };

  submit(): void {
    this.id = this.character.id;
    this.totalService.getById.character(this.id).subscribe(
      {
        next: (value) => {
          this.singleCharacter = value;
          this.singleComponentService.setSingleInfo.character(this.singleCharacter);
          this.router.navigate([`characters/${this.id}`]);
        },
        error: (e) => this.error = {message: e.message, status: e.status}
      }
    );
  };

  select() {
    const id = this.character.id;
    if (!this.selectedId) {
      this.checkboxService.enable.isChecked()
      this.selectedId = id;
      this.classActive = true;
      this.multipleComponentsService.setId(this.selectedId);
    } else if (this.selectedId) {
      this.classActive = false;
      this.selectedId = undefined;
      this.multipleComponentsService.removeId(id);
      this.checkboxService.disable.isAllChecked()

    }
  };
}
