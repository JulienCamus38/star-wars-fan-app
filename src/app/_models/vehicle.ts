export interface Vehicle {
    cargo_capacity: number;
    consumables: string;
    cost_in_credits: number;
    created: Date;
    crew: number;
    edited: Date;
    length: number;
    manufacturer: string;
    max_atmosphere_speed: string;
    model: string; // search field
    name: string; // search field
    passengers: number;
    pilots: any[];
    films: any[];
    url: string;
    vehicle_class: string;
}