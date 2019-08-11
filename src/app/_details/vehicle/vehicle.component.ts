import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { Vehicle } from 'src/app/_models/vehicle';
import { Film } from 'src/app/_models/film';
import { People } from 'src/app/_models/people';

import { ResourceService } from 'src/app/_services';

@Component({
    selector: 'app-vehicle',
    templateUrl: './vehicle.component.html'
})
export class VehicleComponent implements OnInit {

    @Input() vehicle: Vehicle

    films: Observable<Film[]>;
    pilots: Observable<People[]>;

    constructor(private resourceService: ResourceService) {
    }

    ngOnInit() {
        this.films = this.resourceService.getFilmsOfResource(this.vehicle);
        this.pilots = this.resourceService.getPilotsOfResource(this.vehicle);
    }

    showResource(resource: any) {
        this.resourceService.showResource(resource);
    }

}
