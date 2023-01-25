import {Component, OnInit} from '@angular/core';
import {ICharacter} from "../../interfaces";
import {MultipleComponentsService} from "../../services";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  randomId: Array<number> = [...Array(20)].map(() => (Math.floor(Math.random() * 800)))
  characters: ICharacter[]


  constructor(private multipleComponentsService: MultipleComponentsService) {

    this.multipleComponentsService.setManyIds(this.randomId)

  }

  ngOnInit(): void {
    this.multipleComponentsService.getComponentsById.characters().subscribe(value => {
      this.characters = value
    })

  }
}
