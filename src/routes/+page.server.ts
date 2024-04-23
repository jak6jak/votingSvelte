/** @type {import('./$types').Actions} */
export const actions = {
	addMovies: async ({ request }) => {
		const data = await request.formData();
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