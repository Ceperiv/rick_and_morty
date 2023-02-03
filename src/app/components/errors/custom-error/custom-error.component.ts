import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-custom-error',
  templateUrl: './custom-error.component.html',
  styleUrls: ['./custom-error.component.scss']
})
export class CustomErrorComponent implements OnInit{
constructor(private route:ActivatedRoute) {
}

  ngOnInit(): void {
  }
}
