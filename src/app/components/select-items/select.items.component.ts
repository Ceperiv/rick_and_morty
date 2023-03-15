import {Component, Input, OnInit} from '@angular/core';
import {CheckboxService, MultipleComponentsService} from "../../services";
import {Router} from "@angular/router";
import {ICharacter, IEpisode, ILocation} from "../../interfaces";

@Component({
  selector: 'app-select-items',
  templateUrl: './select.items.component.html',
  styleUrls: ['./select.items.component.scss']
})
export class SelectItemsComponent implements OnInit {

  @Input()
  pageItems: ICharacter[] | IEpisode[] | ILocation[]
  isVisible: boolean = false;
  allSelectedIds: Array<number> = [];

  constructor(private multipleComponentsService: MultipleComponentsService,
              private router: Router,
              private checkboxService: CheckboxService) {
    this.cleanList()
  }

  ngOnInit(): void {
    this.multipleComponentsService.isEmpty()
      .subscribe((value) => this.isVisible = value)
  }

  selected() {
    const currentUrl = this.router.url.split('?')[0]
    console.log(currentUrl)
    let multipleIds = this.multipleComponentsService.getIds()
    if (multipleIds.length === 1) {
      const url = `${currentUrl}/${multipleIds}`
      this.router.navigate([url]);
    } else {
      const multipleUrl = `${currentUrl}/multiple/${multipleIds}`;
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
    this.multipleComponentsService.cleanIds()
    this.pageItems.map(value => {
      if (!this.allSelectedIds.includes(value.id)) {
        this.allSelectedIds.push(value.id)
      }
    })
    this.multipleComponentsService.setManyIds(this.allSelectedIds)
    this.checkboxService.enable.isAllChecked()
  };
}
