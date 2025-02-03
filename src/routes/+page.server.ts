import { redirect } from '@sveltejs/kit';
import {zod} from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import {z} from 'zod';

import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';

const schema =  z.object( {
    MovieNames: z.string()
	.transform(value => value.split('\n').map(item => item.trim()).filter(item => item.length > 0))
	.refine(value => value.every(item => item.length > 0), { message: "Each movie name must be non-empty" }), // Split by newlines and trim each item
} )

export const load = async () => {
	const form = await superValidate(zod(schema));

	return { form };
}


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
		const form = await superValidate(request, zod(schema));
		console.log(form);

		if (!form.valid){
			return fail(400, {form});
		}
		//const data = await request.formData();
		//console.log("create poll form request data: ", ...data);
		//redirect(303,"createpoll")
		console.log("Success");
	}
};