import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { Planet } from 'src/app/_models/planet';
import { Film } from 'src/app/_models/film';
import { People } from 'src/app/_models/people';

import { ResourceService } from 'src/app/_services';

@Component({
    selector: 'app-planet',
    templateUrl: './planet.component.html'
})
export class PlanetComponent implements OnInit {

    @Input() planet: Planet;

    films: Observable<Film[]>;
    residents: Observable<People[]>;

    constructor(private resourceService: ResourceService) {
    }

    ngOnInit() {
        this.films = this.resourceService.getFilmsOfResource(this.planet);
        this.residents = this.resourceService.getResidentsOfResource(this.planet);
    }

    showResource(resource: any) {
        this.resourceService.showResource(resource);
    }

}
