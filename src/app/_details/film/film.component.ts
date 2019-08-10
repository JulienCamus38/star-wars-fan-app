import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

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
    @Input() characters: Observable<People[]>;
    //@Input() planets: Observable<Planet[]>;
    //@Input() species: Observable<Species[]>;
    //@Input() starships: Observable<Starship[]>;
    //@Input() vehicles: Observable<Vehicle[]>;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    private showResource(resource: any) {
        const url = resource.url.split('/');
        const category = url[url.length - 3];
        const id = url[url.length - 2];
        this.router.navigate(['/details', category, id]);
    }

    log() {
        console.log(this.film);
        console.log(this.characters);
    }

}
