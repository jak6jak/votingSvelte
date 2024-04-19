import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

class UserMovieData {
    title: string;
    search_id: number;
    hash_id: string;
    constructor(title: string, search_id: number){
        this.title = title;
        this.search_id = search_id;
        this.hash_id = title+search_id;
    }


    toJSON(){
        return {
            title: this.title,
            search_id: this.search_id,
            hash_id: this.hash_id
        }
    }
}


const movieListStore: Writable<UserMovieData[]> = writable([]);

export { movieListStore, UserMovieData}