export interface Statistic {
    unrevised_annotations: number;
    hot: boolean;
    views: number;
}

export interface Primary_artist {
    id: number;
    name: string;
    image_url: string 
}

// Version réduite de la classe song, utilisée pour la page de recherche
export class SongLight {
    constructor(public id: number,public primary_artist: Primary_artist,public image: string, public title: string, public url: string, public stats: Statistic) {}
}

// Version complète de la classe song, utilisée pour la page détails
export class Song extends SongLight {
    constructor(id: number, primary_artist: Primary_artist, image: string, title: string, url: string, stats: Statistic, public description: string, public albumId: number) {
        super(id,primary_artist,image,title,url,stats)
    }
}