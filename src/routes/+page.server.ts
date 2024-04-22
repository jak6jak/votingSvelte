import { movieListStore } from '$lib/stores/stores.js';
import { UserMovieData } from '$lib/stores/stores.js';
/** @type {import('./$types').Actions} */
export const actions = {
	addMovies: async ({ request }) => {
		const data = await request.formData();
		/*let splitInput = data.get("movieInput").split("\n");
		const returnData: string[] = [];
		for (let i = 0; i < splitInput.length; i++) {
			if(splitInput[i] == "") break;
			returnData.push(JSON.stringify(splitInput[i]));
		}
		console.log(returnData);*/
		if (data.get("movieInput") !== null) {
			const lines = data.get("movieInput").split("\n");
			const nonEmptyLines = lines.filter(line => line.trim() !== "");
			const result = nonEmptyLines.join("\n");

			return { movieData: result };
		} else {
			return { movieData: "" };
		}
}

};