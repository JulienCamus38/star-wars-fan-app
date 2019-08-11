import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ResourceService } from './../_services/resource.service';

@Component({
    selector: 'app-resource-details',
    templateUrl: './resource-details.component.html',
    styleUrls: ['./resource-details.component.css']
})
export class ResourceDetailsComponent implements OnInit {

    resourceId: number;
    resourceCategory: string;
    resource: any;

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

}
