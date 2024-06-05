
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
    vote_count: number;
}

import { MOVIE_DB_KEY } from '$env/static/private';

function insertationSort(array: IMovieData[]) {
    for (let i = 1; i < array.length; i++) {
        let j = i - 1;
        const temp = array[i];
        while (j >= 0 && array[j].vote_count < temp.vote_count) {
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = temp;
    }
    return array;

}

export async function GET({ url }) {
    const movieTitle = url.searchParams.get('movieTitle');
    console.log(movieTitle)
    if(movieTitle === null){
        
        return new Response(JSON.stringify("No movie title provided"), {
            status: 400,
            headers: {
                'content-type': 'text/plain;charset=UTF-8',
            },
        });
    }

    
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movieTitle + "&api_key=" + MOVIE_DB_KEY);
    const jsonData = await data.json();
    console.log(jsonData);
    let movieReturnData: IMovieData[] = [];
    for (const movie of jsonData.results) {
            const advancedMovieDetail = await (await fetch('https://api.themoviedb.org/3/movie/' + movie.id + "?api_key=" + MOVIE_DB_KEY)).json();
            //console.log(movieRuntime);
            
            movieReturnData.push({
                    id: movie.id,
                    title: movie.title,
                    overview: movie.overview,
                    poster_path: movie.poster_path,
                    genre_ids: movie.genre_ids.map((genre: number) => genres.genres.find((g) => g.id === genre)?.name),
                    vote_average: movie.vote_average,
                    release_date: movie.release_date,
                    runtime: advancedMovieDetail.runtime,
                    vote_count: movie.vote_count,
            });
    }
    movieReturnData = insertationSort(movieReturnData);

    if(movieReturnData.length === 0){
        const  returnObject = [
            {
            id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
           title: movieTitle,
           overview: "Movie Not Found",
           poster_path: "",
           genre_ids: [],
           vote_average: 0,
           release_date: "Unknown",
           runtime: "Unkown",
            }
        ];
        
        return new Response(JSON.stringify(returnObject), {
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