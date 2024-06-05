/** @type {import('./$types').Actions} */
export const actions = {
	addMovies: async ({ request }) => {
		const data = await request.formData();
		console.log(...data);
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
	}
};