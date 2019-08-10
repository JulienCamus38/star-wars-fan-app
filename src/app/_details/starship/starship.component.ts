import { Component, OnInit, Input } from '@angular/core';
import { Starship } from 'src/app/_models/starship';

@Component({
  selector: 'app-starship',
  templateUrl: './starship.component.html'
})
export class StarshipComponent implements OnInit {

  @Input() starship: Starship;

  constructor() { }

  ngOnInit() {
  }

}
