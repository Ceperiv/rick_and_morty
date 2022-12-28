import {Component, Input, OnInit} from '@angular/core';
import {ICharacter} from "../../interfaces";
import {SingleComponentService, TotalService} from "../../services";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  @Input()
  character: ICharacter;

  singleCharacter: ICharacter;
  id: number;
  originUrl: string;
  locationUrl: string
  episodeUrls: Array<string> = []

  constructor(private totalService: TotalService,
              private router: Router,
              private singleComponentService: SingleComponentService) {
  };

  submit(): void {
    this.id = this.character.id
    this.totalService.getById.characters(this.id).subscribe((value) => {
        this.singleCharacter = value
        this.singleComponentService.setSingleInfo.character(this.singleCharacter)
        this.router.navigate([`characters/${this.id}`])
      }
    );
  }

  ngOnInit(): void {
    const originId = this.character.origin.url.split('/').slice(-1).toString()
    const locationId = this.character.location.url.split('/').slice(-1).toString()

    this.character.episode.map((value) => {
      const episodeId = value.split('/').slice(-1).toString()
      const episodeUrl = `/episodes/${episodeId ? episodeId : ''}`
      this.episodeUrls.push(episodeUrl)
    })

    this.originUrl = `/locations/${originId}`
    this.locationUrl = `/locations/${locationId}`

  }
}
