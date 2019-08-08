export interface People {
    birth_year: any;
    eye_color: string;
    films: any[];
    gender: string;
    hair_color: string;
    height: number;
    homeworld: string;
    mass: number;
    name: string; // search field
    skin_color: string;
    created: Date;
    edited: Date;
    species: any[];
    starships: any[];
    url: string;
    vehicles: any[];
}

export interface SwapiResponse<T> {
    count: number;
    next: string;
    previous: string;
    results: T[];
}