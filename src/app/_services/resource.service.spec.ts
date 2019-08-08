import { TestBed, inject } from '@angular/core/testing';

import { ResourceService } from './resource.service';

describe('CharacterService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ResourceService]
        });
    });

    it('should be created', inject([ResourceService], (service: ResourceService) => {
        expect(service).toBeTruthy();
    }));
});