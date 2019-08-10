export interface Root {
    films: any[];
    people: any[];
    planets: any[];
    species: any[];
    starships: any[];
    vehicles: any[];
}

export interface SwapiResponse<T> {
    count: number;
    next: string;
    previous: string;
    results: T[];
}