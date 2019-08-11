import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { ResourceService } from './../../_services/resource.service';

import { Film } from 'src/app/_models/film';
import { People } from 'src/app/_models/people';
import { Planet } from 'src/app/_models/planet';
import { Species } from 'src/app/_models/species';
import { Starship } from 'src/app/_models/starship';
import { Vehicle } from 'src/app/_models/vehicle';

@Component({
    selector: 'app-film',
    templateUrl: './film.component.html'
})
export class FilmComponent implements OnInit {

    @Input() film: Film;

    characters: Observable<People[]>;
    planets: Observable<Planet[]>;
    species: Observable<Species[]>;
    starships: Observable<Starship[]>;
    vehicles: Observable<Vehicle[]>;

    constructor(private resourceService: ResourceService) {
    }

    ngOnInit() {
        this.characters = this.resourceService.getCharactersOfResource(this.film);
        this.planets = this.resourceService.getPlanetsOfResource(this.film);
        this.species = this.resourceService.getSpeciesOfResource(this.film);
        this.starships = this.resourceService.getStarshipsOfResource(this.film);
        this.vehicles = this.resourceService.getVehiclesOfResource(this.film);
    }

    showResource(resource: any) {
        this.resourceService.showResource(resource);
    }
}
