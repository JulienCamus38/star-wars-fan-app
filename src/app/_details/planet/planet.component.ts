import { Component, OnInit, Input } from '@angular/core';
import { Planet } from 'src/app/_models/planet';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html'
})
export class PlanetComponent implements OnInit {

  @Input() planet: Planet;

  constructor() { }

  ngOnInit() {
  }

}
