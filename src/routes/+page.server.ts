import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	addMovies: async ({ request }) => {
		const data = await request.formData();
		//console.log(data[0]);
		if (data.get("movieInput") !== "") {
			const lines = data.get("movieInput").split("\n");
			const nonEmptyLines = lines.filter(line => line.trim() !== "");
			const result = nonEmptyLines.join("\n");
			
			return { movieData: result };
		} else {
			console.log("No movie data provided");
			return { movieData: null };
		}
},
	createPoll: async ({ request }) => {
		console.log("createPoll")
		const data = await request.formData();
		console.log("create poll form request data: ", ...data);
		redirect(303,"createpoll")
	}
};