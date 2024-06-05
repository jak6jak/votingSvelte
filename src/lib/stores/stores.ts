import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

class UserMovieData {
    title: string;
    search_id: number;
    user_id: number = -1;
    database_id: number = -1;
    constructor(title: string, search_id: number){
        this.title = title;
        this.search_id = search_id;
        this.user_id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        this.database_id = -1;
    }
    setRealId(real_id: num){
        this.user_id = real_id;
    }

    toJSON(){
        return {
            title: this.title,
            search_id: this.search_id,
            real_id: this.user_id
        }
    }
}


const movieListStore: Writable<UserMovieData[]> = writable([]);

export { movieListStore, UserMovieData}