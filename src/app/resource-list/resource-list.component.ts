import { Component, OnInit } from '@angular/core';

import { ResourceService } from '../_services/resource.service';

import { Film } from './../_models/film';
import { People } from './../_models/people';
import { Planet } from './../_models/planet';
import { Species } from './../_models/species';
import { Starship } from './../_models/starship';
import { Vehicle } from './../_models/vehicle';

import { Router } from '@angular/router';

@Component({
    selector: 'app-resource-list',
    templateUrl: './resource-list.component.html',
    styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent implements OnInit {

    films: Film[];
    people: People[];
    planets: Planet[];
    species: Species[];
    starships: Starship[];
    vehicles: Vehicle[];

    searchText;

    constructor(private resourceService: ResourceService, private router: Router) { }

    ngOnInit() {
        this.getFilms();
        this.getPeople();
        this.getPlanets();
        this.getSpecies();
        this.getStarships();
        this.getVehicles();
    }

    public getFilms(): void {
        this.resourceService.getFilms().subscribe(
            films => this.films = films
        );
    }

    public getPeople(): void {
        this.resourceService.getPeople().subscribe(
            people => this.people = people
        );
    }

    public getPlanets(): void {
        this.resourceService.getPlanets().subscribe(
            planets => this.planets = planets
        );
    }

    public getSpecies(): void {
        this.resourceService.getSpecies().subscribe(
            species => this.species = species
        );
    }

    public getStarships(): void {
        this.resourceService.getStarships().subscribe(
            starships => this.starships = starships
        );
    }

    public getVehicles(): void {
        this.resourceService.getVehicles().subscribe(
            vehicles => this.vehicles = vehicles
        );
    }

    public showResource(resource: any) {
        const url = resource.url.split('/');
        const category = url[url.length - 3];
        const id = url[url.length - 2];
        this.router.navigate(['/details', category, id]);
    }

}
