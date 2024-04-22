<script lang="ts">
	import heroImage from '$lib/images/movie-night-polls-2.gif';

	import MovieItem from '$lib/components/MovieItem.svelte';
	import { movieListStore } from '$lib/stores/stores';
	import { UserMovieData } from '$lib/stores/stores';
	import { enhance } from '$app/forms';
	import Layout from './+layout.svelte';
	import type { ActionData } from './$types';

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form: ActionData;

	let userMovieInput = '';
	/*$: {
		let splitList = userMovieInput.split('\n');
		movieListStore.update(value => {
			
			return [...value,new UserMovieData(splitList[splitList.length-1],0)]
			
		})
	}
*/
	$: {
		//let movieJson = JSON.parse(form);
		if (form?.movieData !== undefined) {
		let splitlist = form?.movieData.split('\n').filter((element: String) => element !== '');
		movieListStore.update((value) => {
			let returnValue: UserMovieData[] = [];
			splitlist.forEach((element) => {
				returnValue.push(new UserMovieData(element, 0));
			});
			return [...value, ...returnValue];
		});
	}
	}
	function handlePaste(event: ClipboardEvent) {
		//pasted data now we fetch
		return;
		let movieInput = event.clipboardData?.getData('text');
		if (movieInput === undefined) return;
		let splitlist = movieInput.split('\n');
		movieListStore.update((value) => {
			let returnValue: UserMovieData[] = [];
			splitlist.forEach((element) => {
				returnValue.push(new UserMovieData(element, 0));
			});
			return [...value, ...returnValue];
		});
		console.log("hjeol")
		userMovieInput = '';
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
		>Input /Paste Movies to vote on:</label
	>
	

</div>
<div
		class=" z-10 shadow flex sticky top-0 justify-center items-center  sliced-start-poll-border md:border-30 bg-bluishblack"
	>
		<form method="POST" class="w-full flex" action="?/addMovies" use:enhance >
			<div class="flex">
				<button
					type="submit"
					class="brightness-100 active:brightness-75 hover:brightness-110 bg-[url('$lib/images/plusButton.webp')] min-h-16 min-w-16 md:min-h-32 md:min-w-32 text-bluishblack rounded-lg bg-center text-white bg-cover"
					>+</button
				>
			</div>
			<div
				class=" md:mx-5 hover:brightness-110 sticky grow top-0 sliced-input-border md:border-30 border-8"
			>
				<textarea name="movieInput" bind:value={userMovieInput} on:paste={handlePaste} rows="1" class=" w-full h-full"  required autofocus ></textarea>
			</div>
			<div class="flex bg-transparent">
				<button
					class="brightness-100 bg-transparent sliced-start-poll-border font-Cinzel border-8 md:border-30 active:brightness-75 hover:brightness-110 min-h-16 min-w-16 md:min-h-32 md:min-w-32 text-white rounded-lg bg-center bg-cover bg-transparent"
					>Create Poll</button
				>
			</div>
		</form>
	</div>
	<div class="bg-repeat-round min-h-screen bg-bluishblack">
		<div class="flex flex-col items-center px-5">
			{#each $movieListStore as item (item.title)}
				<MovieItem movieTitle={item?.title} />
			{/each}
		</div>

		<!--<object class="w-1/6 h-screen bg-repeat" data="hollyowwd lines.svg" type="image/svg+xml"></object> -->
	</div>