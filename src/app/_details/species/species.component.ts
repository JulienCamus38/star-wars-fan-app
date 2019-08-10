import { Component, OnInit, Input } from '@angular/core';
import { Species } from 'src/app/_models/species';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html'
})
export class SpeciesComponent implements OnInit {

  @Input() species: Species;

  constructor() { }

  ngOnInit() {
  }

}
