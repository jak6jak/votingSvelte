<script lang="ts">
	import heroImage from '$lib/images/movie-night-polls-2.gif';
	import MovieItem from '$lib/components/MovieItem.svelte';
	import { movieListStore } from '$lib/stores/stores';
	import { UserMovieData } from '$lib/stores/stores';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { State } from '$lib';

	/** @type {import('./$types').ActionData} */
	export let form: ActionData;

	$: {
		//let movieJson = JSON.parse(form);
		if (form?.movieData !== null && form?.movieData !== undefined) {
			let splitlist = form?.movieData.split('\n');
			movieListStore.update((value) => {
				let returnValue: UserMovieData[] = [];
				splitlist.forEach((element) => {
					returnValue.push(new UserMovieData(element, 0));
				});
				return [...value, ...returnValue];
			});
		}
	}

	movieListStore.subscribe((value) => {
		//userMovieInputList = value;
	});
</script>

<div class="w-screen bg-bluishblack">
	<div class="relative">
		<img
			class="relative container mx-auto size-1/4 object-center"
			src={heroImage}
			alt="movie night polls"
		/>
	</div>
	<label class=" text-zinc-100 font-serif text-center block pb-4 text-xl"
		>Input / Paste Movies to vote on. Press + button to add movie(s) to poll:</label
	>
</div>
<div
	class=" z-10 shadow flex sticky top-0 justify-center items-center sliced-start-poll-border md:border-30 bg-bluishblack"
>
	<form method="POST" class="w-full flex" action="?/addMovies" use:enhance>
		
		<div
			class="hover:brightness-110 sticky grow top-0 sliced-input-border md:border-30 border-8 mx-1"
		>
			<textarea
				name="movieInput"
				rows="1"
				class=" w-full h-full"
				autofocus
				on:keydown={(e) => {
					if (e.key === 'Enter' && !e.shiftKey) {
						e.preventDefault();
						e.target.form.dispatchEvent(new Event('submit'));
					}
				}}
			></textarea>
		</div>
		<div class="flex bg-transparent">
			<button
				type="submit"
				class="brightness-100 active:brightness-75 hover:brightness-110 bg-[url('$lib/images/plusButton.webp')] min-h-16 min-w-16 md:min-h-32 md:min-w-32 max-h-32 text-bluishblack rounded-lg bg-center text-white bg-cover"
				>+</button
			>
		</div>
	
	<div class="flex bg-transparent">
		<button formaction="?/createPoll"
			class="brightness-100 sliced-start-poll-border font-Cinzel border-8 md:border-30 active:brightness-75 hover:brightness-110 min-h-16 min-w-16 md:min-h-32 md:min-w-32 text-white rounded-lg bg-center bg-transparent"
			>Create Poll</button
		>
	</div>
	</form>
</div>
<div class="bg-repeat-round min-h-screen bg-bluishblack">
	<div class="flex flex-col items-center px-5 md:grid lg:grid-cols-2 md:gap-4 ">
		{#each $movieListStore as item (item.user_id)}
			<MovieItem movieTitle={item?.title} state={State.view} movieFakeId={item.user_id} />
		{/each}
	</div>

	<!--<object class="w-1/6 h-screen bg-repeat" data="hollyowwd lines.svg" type="image/svg+xml"></object> -->
</div>
