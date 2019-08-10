import { Component, OnInit, Input } from '@angular/core';
import { People } from 'src/app/_models/people';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html'
})
export class PeopleComponent implements OnInit {

  @Input() people: People;

  constructor() { }

  ngOnInit() {
  }

}
