import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { ResourceService } from './../_services/resource.service';

import { Film } from './../_models/film';
import { People } from './../_models/people';
import { Planet } from './../_models/planet';
import { Species } from './../_models/species';
import { Starship } from './../_models/starship';
import { Vehicle } from './../_models/vehicle';

@Component({
    selector: 'app-resource-details',
    templateUrl: './resource-details.component.html',
    styleUrls: ['./resource-details.component.css']
})
export class ResourceDetailsComponent implements OnInit {

    resourceId: number;
    resourceCategory: string;
    resource: any;

    films: Observable<Film[]>;
    people: Observable<People[]>;
    planets: Observable<Planet[]>;
    species: Observable<Species[]>;
    starships: Observable<Starship[]>;
    vehicles: Observable<Vehicle[]>;

    constructor(private route: ActivatedRoute, private resourceService: ResourceService, private router: Router) { }

    ngOnInit() {
        this.route.paramMap.subscribe(
            params => {
                this.resourceId = +params.get('id');
                this.resourceCategory = params.get('category');
                if (this.resourceId) {
                    this.resourceService.getResource(this.resourceCategory, this.resourceId).subscribe(resource => {
                        if (resource == null) {
                            this.noResourceFound();
                        } else {
                            this.resource = resource;
                            this.fetchDetails();
                        }
                    },
                        error => { // TODO: does not work yet
                            alert('Error when fetching resource details');
                            this.router.navigate['/list'];
                        });
                }
            }
        )
    }

    private noResourceFound() {
        alert('Oops, incorrect character link');
        this.router.navigate['/list'];
    }

    private fetchDetails() {
        switch (this.resourceCategory) {
            case 'films': // people (characters), planets, species, starships, vehicles
                this.people = this.resourceService.getPeopleOfResource(this.resource);
                this.planets = this.resourceService.getPlanetsOfResource(this.resource);
                this.species = this.resourceService.getSpeciesOfResource(this.resource);
                this.starships = this.resourceService.getStarshipsOfResource(this.resource);
                this.vehicles = this.resourceService.getVehiclesOfResource(this.resource);

            case 'people': // films, species, starships, vehicles
                this.films = this.resourceService.getFilmsOfResource(this.resource);
                this.species = this.resourceService.getSpeciesOfResource(this.resource);
                this.starships = this.resourceService.getStarshipsOfResource(this.resource);
                this.vehicles = this.resourceService.getVehiclesOfResource(this.resource);

            case 'planets': // people (residents), films
            case 'species': // people, films
            case 'starships': // people (pilots), films
            case 'vehicles': // people (pilots), films
                this.people = this.resourceService.getPeopleOfResource(this.resource);
                this.films = this.resourceService.getFilmsOfResource(this.resource);

            default:
                break;
        }
    }

}
