import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { People } from 'src/app/_models/people';
import { Planet } from 'src/app/_models/planet';
import { Species } from 'src/app/_models/species';
import { Starship } from 'src/app/_models/starship';
import { Vehicle } from 'src/app/_models/vehicle';
import { Film } from 'src/app/_models/film';

import { ResourceService } from 'src/app/_services';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html'
})
export class PeopleComponent implements OnInit {

    @Input() people: People;

    films: Observable<Film[]>;
    homeworld: Observable<Planet[]>;
    species: Observable<Species[]>;
    starships: Observable<Starship[]>;
    vehicles: Observable<Vehicle[]>;

    constructor(private resourceService: ResourceService) {
    }

    ngOnInit() {
        this.films = this.resourceService.getFilmsOfResource(this.people);
        this.homeworld = this.resourceService.getHomeworldOfResource(this.people);
        this.species = this.resourceService.getSpeciesOfResource(this.people);
        this.starships = this.resourceService.getStarshipsOfResource(this.people);
        this.vehicles = this.resourceService.getVehiclesOfResource(this.people);
    }

    showResource(resource: any) {
        this.resourceService.showResource(resource);
    }

}
