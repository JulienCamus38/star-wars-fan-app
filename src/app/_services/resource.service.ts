import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, concatMap, publishReplay, refCount } from 'rxjs/operators';

import { Film } from './../_models/film';
import { People } from './../_models/people';
import { Planet } from './../_models/planet';
import { Species } from './../_models/species';
import { Starship } from './../_models/starship';
import { Vehicle } from './../_models/vehicle';
import { SwapiResponse } from './../_models/root';
import { Router } from '@angular/router';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class ResourceService {

    // urls
    private filmsUrl = 'https://swapi.co/api/films';
    private peopleUrl = 'https://swapi.co/api/people';
    private planetsUrl = 'https://swapi.co/api/planets';
    private speciesUrl = 'https://swapi.co/api/species';
    private starshipsUrl = 'https://swapi.co/api/starships';
    private vehiclesUrl = 'https://swapi.co/api/vehicles';

    // observables
    private films: Observable<Film[]>;
    private people: Observable<People[]>;
    private planets: Observable<Planet[]>;
    private species: Observable<Species[]>;
    private starships: Observable<Starship[]>;
    private vehicles: Observable<Vehicle[]>;

    constructor(private httpClient: HttpClient, private router: Router) {
        this.films = this.getDomainObjects(this.filmsUrl);
        this.people = this.getDomainObjects(this.peopleUrl);
        this.planets = this.getDomainObjects(this.planetsUrl);
        this.species = this.getDomainObjects(this.speciesUrl);
        this.starships = this.getDomainObjects(this.starshipsUrl);
        this.vehicles = this.getDomainObjects(this.vehiclesUrl);
    }

    /**
    * Cache the HTTP response
    * @param { string } url
    * @returns { Observable<T[]> }
    */
    private getDomainObjects<T>(url: string): Observable<T[]> {
        return this.getApiPage<T>(url)
            .pipe(
                publishReplay(1)
            )
            .pipe(
                refCount()
            );
    }

    /**
     * Get all pages by the given URL
     * @param { string } url
     * @returns { Observable<T[]> }
     */
    private getApiPage<T>(url: string): Observable<T[]> {
        return this.httpClient.get<SwapiResponse<T>>(url, httpOptions)
            .pipe(
                concatMap((response: any) => {
                    if (response.next) {
                        return this.getApiPage(response.next)
                            .pipe(
                                map(resultsToJoin => [...response.results, ...resultsToJoin]))
                            .pipe(
                                map(data => {
                                    data.sort((a, b) => {
                                        return (a.title < b.title || a.name < b.name) ? -1 : 1;
                                    });
                                    return data;
                                }));
                    } else {
                        return of(response.results)
                            .pipe(
                                map(data => {
                                    data.sort((a, b) => {
                                        return (a.title < b.title || a.name < b.name) ? -1 : 1;
                                    });
                                    return data;
                                }));
                    }
                }), catchError(this.handleError));
    }

    /**
     * Get films
     * @returns { Observable<Film[]> }
     */
    public getFilms(): Observable<Film[]> { return this.films; }

    /**
     * Get people
     * @returns { Observable<People[]> }
     */
    public getPeople(): Observable<People[]> { return this.people; }

    /**
     * Get planets
     * @returns { Observable<Planet[]> }
     */
    public getPlanets(): Observable<Planet[]> { return this.planets; }

    /**
     * Get species
     * @returns { Observable<Species[]> }
     */
    public getSpecies(): Observable<Species[]> { return this.species; }

    /**
     * Get starships
     * @returns { Observable<Starship[]> }
     */
    public getStarships(): Observable<Starship[]> { return this.starships; }

    /**
     * Get vehicles
     * @returns { Observable<Vehicle[]> }
     */
    public getVehicles(): Observable<Vehicle[]> { return this.vehicles; }

    /**
     * Get resource by category and id
     * @param { string } category
     * @param { number } id
     * @returns { Observable<any> }
     */
    public getResource(category: string, id: number): Observable<any> {
        switch (category) {
            case 'films': return this.getFilm(id);
            case 'people': return this.getPerson(id);
            case 'planets': return this.getPlanet(id);
            case 'species': return this.getOneSpecies(id);
            case 'starships': return this.getStarship(id);
            case 'vehicles': return this.getVehicle(id);
            default: return null;
        }
    }

    /**
     * Get film by id
     * @param { number } id
     * @returns { Observable<Film> }
     */
    public getFilm(id: number): Observable<Film> {
        return this.films.pipe(map((films: Film[]) => {
            return films.find((film: Film) => {
                const url = film.url.split('/');
                const currId = Number(url[url.length - 2]);
                return currId === id;
            });
        }));
    }

    /**
     * Get people by id
     * @param { number } id
     * @returns { Observable<People> }
     */
    public getPerson(id: number): Observable<People> {
        return this.people.pipe(map((people: People[]) => {
            return people.find((person: People) => {
                const url = person.url.split('/');
                const currId = Number(url[url.length - 2]);
                return currId === id;
            });
        }));
    }

    /**
     * Get planet by id
     * @param { number } id
     * @returns { Observable<Planet> }
     */
    public getPlanet(id: number): Observable<Planet> {
        return this.planets.pipe(map((planets: Planet[]) => {
            return planets.find((planet: Planet) => {
                const url = planet.url.split('/');
                const currId = Number(url[url.length - 2]);
                return currId === id;
            });
        }));
    }

    /**
     * Get species by id
     * @param { number } id
     * @returns { Observable<Species> }
     */
    public getOneSpecies(id: number): Observable<Species> {
        return this.species.pipe(map((species: Species[]) => {
            return species.find((s: Species) => {
                const url = s.url.split('/');
                const currId = Number(url[url.length - 2]);
                return currId === id;
            });
        }));
    }

    /**
     * Get starship by id
     * @param { number } id
     * @returns { Observable<Starship> }
     */
    public getStarship(id: number): Observable<Starship> {
        return this.starships.pipe(map((starships: Starship[]) => {
            return starships.find((starship: Starship) => {
                const url = starship.url.split('/');
                const currId = Number(url[url.length - 2]);
                return currId === id;
            });
        }));
    }

    /**
     * Get vehicle by id
     * @param { number } id
     * @returns { Observable<Vehicle> }
     */
    public getVehicle(id: number): Observable<Vehicle> {
        return this.vehicles.pipe(map((vehicles: Vehicle[]) => {
            return vehicles.find((vehicle: Vehicle) => {
                const url = vehicle.url.split('/');
                const currId = Number(url[url.length - 2]);
                return currId === id;
            });
        }));
    }

    /**
     * Get films of resource
     * @returns { Observable<Film[]> }
     */
    public getFilmsOfResource(resource: any): Observable<Film[]> {
        return this.films.pipe(map((films: Film[]) => films.filter(
            (f: Film) => {
                return resource.films.indexOf(f.url) > -1;
            }
        )));
    }

    /**
     * Get people of resource
     * @returns { Observable<People[]> }
     */
    public getPeopleOfResource(resource: any): Observable<People[]> {
        return this.people.pipe(map((people: People[]) => people.filter(
            (p: People) => {
                return resource.people.indexOf(p.url) > -1;
            }
        )));
    }

    /**
     * Get characters of resource
     * @returns { Observable<People[]> }
     */
    public getCharactersOfResource(resource: any): Observable<People[]> {
        return this.people.pipe(map((people: People[]) => people.filter(
            (p: People) => {
                return resource.characters.indexOf(p.url) > -1;
            }
        )));
    }

    /**
     * Get residents of resource
     * @returns { Observable<People[]> }
     */
    public getResidentsOfResource(resource: any): Observable<People[]> {
        return this.people.pipe(map((people: People[]) => people.filter(
            (p: People) => {
                return resource.residents.indexOf(p.url) > -1;
            }
        )));
    }

    /**
     * Get pilots of resource
     * @returns { Observable<People[]> }
     */
    public getPilotsOfResource(resource: any): Observable<People[]> {
        return this.people.pipe(map((people: People[]) => people.filter(
            (p: People) => {
                return resource.pilots.indexOf(p.url) > -1;
            }
        )));
    }

    /**
     * Get planets of resource
     * @returns { Observable<Planet[]> }
     */
    public getPlanetsOfResource(resource: any): Observable<Planet[]> {
        return this.planets.pipe(map((planets: Planet[]) => planets.filter(
            (p: Planet) => {
                return resource.planets.indexOf(p.url) > -1;
            }
        )));
    }

    /**
     * Get homeworld of resource
     * @returns { Observable<Planet[]> }
     */
    public getHomeworldOfResource(resource: any): Observable<Planet[]> {
        return this.planets.pipe(map((planets: Planet[]) => planets.filter(
            (p: Planet) => {
                return resource.homeworld.indexOf(p.url) > -1;
            }
        )));
    }

    /**
     * Get species of resource
     * @returns { Observable<Species[]> }
     */
    public getSpeciesOfResource(resource: any): Observable<Species[]> {
        return this.species.pipe(map((species: Species[]) => species.filter(
            (s: Species) => {
                return resource.species.indexOf(s.url) > -1;
            }
        )));
    }

    /**
     * Get starships of resource
     * @returns { Observable<Starship[]> }
     */
    public getStarshipsOfResource(resource: any): Observable<Starship[]> {
        return this.starships.pipe(map((starships: Starship[]) => starships.filter(
            (s: Starship) => {
                return resource.starships.indexOf(s.url) > -1;
            }
        )));
    }

    /**
     * Get vehicles of resource
     * @returns { Observable<Vehicle[]> }
     */
    public getVehiclesOfResource(resource: any): Observable<Vehicle[]> {
        return this.vehicles.pipe(map((vehicles: Vehicle[]) => vehicles.filter(
            (v: Vehicle) => {
                return resource.vehicles.indexOf(v.url) > -1;
            }
        )));
    }

    /**
     * Show details of resource
     * @param resource 
     */
    public showResource(resource: any) {
        const url = resource.url.split('/');
        const category = url[url.length - 3];
        const id = url[url.length - 2];
        this.router.navigate(['/details', category, id]);
    }

    /**
     * Handle error messages
     * @param { Response } error
     * @returns { ErrorObservable }
     */
    private handleError(error: Response) {
        const errMsg = 'Unable to complete the request';
        if (error.status !== 500) {
            const body = error.json() || '';
        }
        return Observable.throw(errMsg);
    }
}
