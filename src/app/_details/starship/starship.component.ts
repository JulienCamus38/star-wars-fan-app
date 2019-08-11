import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { Starship } from 'src/app/_models/starship';
import { Film } from 'src/app/_models/film';
import { People } from 'src/app/_models/people';

import { ResourceService } from 'src/app/_services';

@Component({
    selector: 'app-starship',
    templateUrl: './starship.component.html'
})
export class StarshipComponent implements OnInit {

    @Input() starship: Starship;

    films: Observable<Film[]>;
    pilots: Observable<People[]>;

    constructor(private resourceService: ResourceService) {
    }

    ngOnInit() {
        this.films = this.resourceService.getFilmsOfResource(this.starship);
        this.pilots = this.resourceService.getPilotsOfResource(this.starship);
    }

    showResource(resource: any) {
        this.resourceService.showResource(resource);
    }

}
