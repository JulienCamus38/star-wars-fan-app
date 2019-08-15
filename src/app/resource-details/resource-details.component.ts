import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ResourceService, AlertService } from '../_services';

@Component({
    selector: 'app-resource-details',
    templateUrl: './resource-details.component.html'
})
export class ResourceDetailsComponent implements OnInit {

    resourceId: number;
    resourceCategory: string;
    resource: any;

    constructor(private route: ActivatedRoute, private resourceService: ResourceService, private alertService: AlertService, private router: Router) { }

    ngOnInit() {
        this.route.paramMap.subscribe(
            params => {
                this.resourceId = +params.get('id');
                this.resourceCategory = params.get('category');
                if (this.resourceId) {
                    this.resourceService
                    .getResource(this.resourceCategory, this.resourceId)
                    .subscribe(resource => {
                        if (resource == null) {
                            this.noResourceFound();
                        } else {
                            this.resource = resource;
                        }
                    },
                    error => {
                            this.router.navigate(['/list']);
                            this.alertService.error('Error when fetching resource details');
                        });
                }
                else {
                    // Manage if resourceId is NaN
                    this.noResourceFound();
                }
            }
        );
    }

    private noResourceFound() {
        this.router.navigate(['/list']);
        this.alertService.error('Oops, incorrect resource link');
    }

}
