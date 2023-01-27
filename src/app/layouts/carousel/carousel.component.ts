import {Component, OnInit} from '@angular/core';

import {ICharacter} from "../../interfaces";
import {CarouselService} from "../../services";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  randomId: Array<number> = [...Array(20)].map(() => (Math.floor(Math.random() * 800)))
  characters: ICharacter[]

  constructor(private carouselService: CarouselService) {
    this.carouselService.setCarouselIds(this.randomId)
  }

  ngOnInit(): void {
    this.carouselService.getRandomCharacters().subscribe(value => {
      this.characters = value
      this.carouselService.cleanRandomIds()
    })
  }
}
