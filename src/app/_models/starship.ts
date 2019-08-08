export interface Starship {
    mglt: string;
    cargo_capacity: number;
    consumables: string;
    cost_in_credits: number;
    created: Date;
    crew: number;
    edited: Date;
    hyperdrive_rating: number;
    length: number;
    manufacturer: string;
    max_atmosphere_speed: string;
    model: string; // search field
    name: string; // search field
    passengers: number;
    films: any[];
    pilots: any[];
    starship_class: string;
    url: string;
}