import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { Species } from 'src/app/_models/species';
import { Film } from 'src/app/_models/film';
import { People } from 'src/app/_models/people';
import { Planet } from 'src/app/_models/planet';

import { ResourceService } from 'src/app/_services';

@Component({
	selector: 'app-species',
	templateUrl: './species.component.html'
})
export class SpeciesComponent implements OnInit {

	@Input() species: Species;

	films: Observable<Film[]>;
	people: Observable<People[]>;
	homeworld: Observable<Planet[]>;

	constructor(private resourceService: ResourceService) {
	}

	ngOnInit() {
		this.films = this.resourceService.getFilmsOfResource(this.species);
		this.people = this.resourceService.getPeopleOfResource(this.species);
		this.homeworld = this.resourceService.getHomeworldOfResource(this.species);
	}

	showResource(resource: any) {
		this.resourceService.showResource(resource);
	}

}
