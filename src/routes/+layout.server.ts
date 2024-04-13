export { UserMovieData };
export type { IMovieData };

declare global {
    interface IMovieData {
        id: number;
        title: string;
        overview: string;
        poster_path: string;
        genre_ids: string[];
        vote_average: number;
        release_date: string;
        runtime: number;
    }

    export class UserMovieData {
        title: string;
        search_id: number;
        hash_id: string;
        constructor(title: string, search_id: number){
            this.title = title;
            this.search_id = search_id;
            this.hash_id = title+search_id;
        }
    }

    
}
