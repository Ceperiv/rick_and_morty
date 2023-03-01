import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {ICharacter, IPageError} from "../../interfaces";
import {CheckboxService, MultipleComponentsService, SingleComponentService, TotalService} from "../../services";

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  @Input()
  character: ICharacter;

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
      if (!value) {
        this.selectedId = undefined;
        this.multipleComponentsService.removeId(this.character.id);
        this.multipleComponentsService.cleanIds()
        this.classActive = value
      }
    });

    this.checkboxService.isAllChecked().subscribe(value => {
      if (value) {
        this.multipleComponentsService.getIds().map(value => {
          if (this.character.id === value) {
            this.selectedId = this.character.id;
            this.classActive = true
          }
        })
      }
    });
  };

  submit(): void {
    this.singleComponentService.setSingleInfo.character(this.character);
    this.router.navigate([`characters/${this.character.id}`]);
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
