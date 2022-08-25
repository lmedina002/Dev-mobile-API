import { Album, Producteur } from './album.model';
import Artist from './artist.model';
import { SongLight, Primary_artist, Statistic, Song } from './song.model';

const rootEndpoint = 'https://api.genius.com';
const access_token = 'aB2Cpe6fJ42lzlpJ04fDJsAlupsrPbuZCvpePYrtI4jfLHWd_CfJTl4t2LFB56-m'

// Interfaces

export interface ArtistTMP {
    id: number,
    name: string,
    image: string,
    url: string,
    description: string
}

export interface SongLightTMP {
    id: number,
    primary_artist: Primary_artist,
    image: string,
    title: string,
    url: string,
    stats: Statistic,
}

export interface SongTMP extends SongLightTMP {
  description: string,
  albumId: number
}

export interface AlbumTMP {
  id: number,
  artistName: string,
  artistId: string,
  title: string,
  image: string,
  releaseDate: string,
  production: Array<Producteur>
}

class geniusDbAPI {

    //------------- Search all songs ---------------------

    private fetchFromApiSongs(query: string): Promise<Array<SongLightTMP>> {
        return (
          fetch(query)
            .then((response) => response.json())
            .then((jsonResponse) =>  jsonResponse.response.hits.map((value: any) => this.JsonToSongLight(value)) || [])
            .catch((error) => {
              console.error(error);
            })
        );
      }
    
    private JsonToSongLight(response): SongLightTMP {
        return {
          id :response.result.id, 
          primary_artist: this.JsonToPrimaryArtist(response.result.primary_artist),
          image: response.result.header_image_url,
          title: response.result.full_title, 
          url: response.result.url,
          stats: this.JsonToStats(response.result.stats)
        }
    }

    private JsonToPrimaryArtist(response): Primary_artist {
      return {
        id :response.id, 
        name: response.name,
        image_url: response.image_url,
      }
    }

    private JsonToStats(response): Statistic {
      return {
        unrevised_annotations: response.unreviewed_annotations,
        hot: response.hot,
        views: response.pageviews 
      }
    }

    SearchAllSongs(input: string): Promise<Array<SongLight>> {
      return this.fetchFromApiSongs(`${rootEndpoint}/search?q=${input.trim()}&access_token=${access_token}`).then((songs) =>
        this.createSongsLight(songs)
      );
    }

    private createSongsLight(songs: Array<SongLightTMP>): Array<SongLight> {
      // Create songs
      return songs.map((song) => this.createSongLight(song));
    }

    private createSongLight(song: SongLightTMP){
        return new SongLight(song.id, song.primary_artist, song.image, song.title, song.url, song.stats)
    }

    //------------- Search one song from id ---------------------

    private fetchFromApiSong(query: string): Promise<void | SongTMP> {
      return (
        fetch(query)
          .then((response) => response.json())
          .then((jsonResponse) =>  this.JsonToSong(jsonResponse.response.song))
          .catch((error) => {
            console.error(error);
          })
      );
    }

    private JsonToSong(response): SongTMP {
        return {
          id :response.id, 
          primary_artist: this.JsonToPrimaryArtist(response.primary_artist),
          image: response.header_image_url,
          title: response.full_title, 
          url: response.url,
          stats: this.JsonToStats(response.stats),
          description : response.description.plain,
          albumId : response.album.id
        }
    }

    SearchSongById(input: number): Promise<Song> {
      return this.fetchFromApiSong(`${rootEndpoint}/songs/${input}?access_token=${access_token}&text_format=plain`).then((song) =>
        this.createSong(song)
      );
    }

    private createSong(song){
        return new Song(song.id, song.primary_artist, song.image, song.title, song.url, song.stats, song.description, song.albumId)
    }




    //------------- Search artist ---------------------

    private fetchFromApiArtist(query: string): Promise<void | ArtistTMP> {
      return (
        fetch(query)
          .then((response) => response.json())
          .then((jsonResponse) =>  this.JsonToArtist(jsonResponse.response.artist))
          .catch((error) => {
            console.error(error);
          })
      );
    }

    private JsonToArtist(response): ArtistTMP {
      return {
        id: response.id,
        name: response.name,
        image: response.image_url,
        url: response.url,
        description: response.description.plain
      }
    }

    SearchArtistById(input: number): Promise<Artist>{
        return this.fetchFromApiArtist(`${rootEndpoint}/artists/${input}?access_token=${access_token}&text_format=plain`).then((artist) =>
        this.createArtist(artist)
        );
    }

    private createArtist(artist){
        return new Artist(artist.id, artist.name, artist.image, artist.url, artist.description)
    }

    //------------- Search album from id ---------------------

    private fetchFromApiAlbum(query: string): Promise<void | AlbumTMP> {
      return (
        fetch(query)
          .then((response) => response.json())
          .then((jsonResponse) =>  this.JsonToAlbum(jsonResponse.response.album))
          .catch((error) => {
            console.error(error);
          })
      );
    }

    private JsonToAlbum(response): AlbumTMP {
      console.log(response);
      return {
        id: response.id,
        artistName: response.artist.name,
        artistId: response.artist.id,
        title: response.name,
        image: response.cover_art_url,
        releaseDate: response.release_date,
        production: this.JsonToProduction(response.song_performances)
      }
    }

    private JsonToProduction(response): Array<Producteur> {
      const result: Producteur[] = [];
      response.forEach((value) => {value.artists.forEach((subValue) => {result.push(this.JsonToProducteur(value, subValue))})});

      return result;
      
    }
    private JsonToProducteur(value, subValue): Producteur {      
      return {
        id: subValue.id, 
        name: subValue.name, 
        role: value.label
      }
    }

    SearchAlbumById(input: number): Promise<Album>{
        return this.fetchFromApiAlbum(`${rootEndpoint}/albums/${input}?access_token=${access_token}`).then((album) =>
        this.createAlbum(album)
        );
    }

    private createAlbum(album){
        return new Album(album.id, album.artistName, album.artistId, album.image, album.title, album.releaseDate, album.production)
    }

    
  }
  

export default new geniusDbAPI();

