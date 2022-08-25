export interface Producteur {
    id: number;
    name: string;
    role: string 
}

export class Album {
    constructor(public id: number,public artistName: string, public artistId: number, public image: string, public title: string, public releaseDate: string, public production: Array<Producteur>) {}
}