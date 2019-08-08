import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Film } from './../_models/film';
import { People } from './../_models/people';
import { Planet } from './../_models/planet';
import { Species } from './../_models/species';
import { Starship } from './../_models/starship';
import { Vehicle } from './../_models/vehicle';

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

    constructor(private httpClient: HttpClient) { }

    /**
     * Get films
     * @returns { Observable<Film[]> }
     */
    public getFilms(): Observable<Film[]> {
        return this.httpClient.get(this.filmsUrl).pipe(
            map(
                (res: any) => <Film[]>res.results),
            catchError(this.handleError)
        );
    }

    /**
     * Get people
     * @returns { Observable<People[]> }
     */
    public getPeople(): Observable<People[]> {
        return this.httpClient.get(this.peopleUrl).pipe(
            map(
                (res: any) => <People[]>res.results),
            catchError(this.handleError)
        );
    }

    /**
     * Get planets
     * @returns { Observable<Planet[]> }
     */
    public getPlanets(): Observable<Planet[]> {
        return this.httpClient.get(this.planetsUrl).pipe(
            map(
                (res: any) => <Planet[]>res.results),
            catchError(this.handleError)
        );
    }

    /**
     * Get species
     * @returns { Observable<Species[]> }
     */
    public getSpecies(): Observable<Species[]> {
        return this.httpClient.get(this.speciesUrl).pipe(
            map(
                (res: any) => <Species[]>res.results),
            catchError(this.handleError)
        );
    }

    /**
     * Get starships
     * @returns { Observable<Starship[]> }
     */
    public getStarships(): Observable<Starship[]> {
        return this.httpClient.get(this.starshipsUrl).pipe(
            map(
                (res: any) => <Starship[]>res.results),
            catchError(this.handleError)
        );
    }

    /**
     * Get vehicles
     * @returns { Observable<Vehicle[]> }
     */
    public getVehicles(): Observable<Vehicle[]> {
        return this.httpClient.get(this.vehiclesUrl).pipe(
            map(
                (res: any) => <Vehicle[]>res.results),
            catchError(this.handleError)
        );
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
