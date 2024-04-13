
const genres = {
    "genres": [
        {
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 80,
            "name": "Crime"
        },
        {
            "id": 99,
            "name": "Documentary"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Family"
        },
        {
            "id": 14,
            "name": "Fantasy"
        },
        {
            "id": 36,
            "name": "History"
        },
        {
            "id": 27,
            "name": "Horror"
        },
        {
            "id": 10402,
            "name": "Music"
        },
        {
            "id": 9648,
            "name": "Mystery"
        },
        {
            "id": 10749,
            "name": "Romance"
        },
        {
            "id": 878,
            "name": "Science Fiction"
        },
        {
            "id": 10770,
            "name": "TV Movie"
        },
        {
            "id": 53,
            "name": "Thriller"
        },
        {
            "id": 10752,
            "name": "War"
        },
        {
            "id": 37,
            "name": "Western"
        }
    ]
};


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

class UserMovieData {
    title: string;
    search_id: number;
    hash_id: string;
    constructor(title: string, search_id: number){
        this.title = title;
        this.search_id = search_id;
        this.hash_id = title+search_id;
    }
}

import { MOVIE_DB_KEY } from '$env/static/private';

export async function GET({ url }) {
    const movieTitle = url.searchParams.get('movieTitle');
    console.log(movieTitle)
    if(movieTitle === null){
        
        return new Response("No movie title provided", {
            status: 400,
            headers: {
                'content-type': 'text/plain;charset=UTF-8',
            },
        });
    }

    
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movieTitle + "&api_key=" + MOVIE_DB_KEY);
    const jsonData = await data.json();
    console.log(jsonData);
    const movieReturnData: IMovieData[] = [];
    for (const movie of jsonData.results) {
            const advancedMovieDetail = await (await fetch('https://api.themoviedb.org/3/movie/' + movie.id + "?api_key=" + MOVIE_DB_KEY)).json();
            //console.log(movieRuntime);
            movieReturnData.push({
                    id: movie.id,
                    title: movie.title,
                    overview: movie.overview,
                    poster_path: movie.poster_path,
                    genre_ids: advancedMovieDetail.genres.map((genre) => genres.genres.find((g) => g.id === genre.id)?.name),
                    vote_average: movie.vote_average,
                    release_date: movie.release_date,
                    runtime: advancedMovieDetail.runtime
            });
    }


    if(movieReturnData.length === 0){
        return new Response("No movies found", {
            status: 404,
            headers: {
                'content-type': 'text/plain;charset=UTF-8',
            },
        });
    }

    return new Response(JSON.stringify(movieReturnData), {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    });
}