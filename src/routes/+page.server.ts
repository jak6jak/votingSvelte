import { movieListStore } from '$lib/stores/stores.js';
import { UserMovieData } from '$lib/stores/stores.js';
/** @type {import('./$types').Actions} */
export const actions = {
addMovies: async ({request}) => {
    const data = await request.formData();
    /*movieListStore.update(value => {
			console.log(value)
			return [...value,new UserMovieData(data.get("movieInput"),0)]
			
		})
		*/
		let splitInput = data.get("movieInput").split("\n");
		let returnData: string[] = [];
		for (let i = 0; i < splitInput.length; i++) {
			returnData.push(JSON.stringify(new UserMovieData(splitInput[i],0)));
		}
		console.log(returnData);
		return {movieData: returnData};

}

};