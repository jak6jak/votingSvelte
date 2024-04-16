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
	export let form : ActionData;

	let userMovieInput = '';
	/*$: {
		let splitList = userMovieInput.split('\n');
		movieListStore.update(value => {
			
			return [...value,new UserMovieData(splitList[splitList.length-1],0)]
			
		})
	}
*/
	$: {
		if (form?.movieData !== undefined) {
			movieListStore.update((value) => {
				console.log(JSON.parse(form?.movieData));
				return [...value, JSON.parse(form?.movieData)];
			});
		}
	}
	function handlePaste(event: ClipboardEvent) {
		//pasted data now we fetch
		userMovieInput = event.clipboardData?.getData('text');
		if(userMovieInput === undefined) return;
		let splitlist = userMovieInput.split('\n');
		movieListStore.update((value) => {
			let returnValue: UserMovieData[] = [];
			splitlist.forEach((element) => {
				returnValue.push(new UserMovieData(element, 0));
			});
			return [...value, ...returnValue];
		});
	}

	movieListStore.subscribe((value) => {
		//userMovieInputList = value;
	});

	let timer;
	const debounce = (v) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			userMovieInput = v;
		}, 750);
	};
</script>

<div class="w-screen h-screen bg-bluishblack">
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
	<div
		class=" z-10 shadow flex sticky top-0 justify-center items-center mx-5 sliced-start-poll-border md:border-30 bg-bluishblack"
	>
		<form method="POST" class="w-full flex" action="?/addMovies" use:enhance>
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
				<input name="movieInput" on:paste={handlePaste} class=" w-full h-full" />
			</div>
			<div class="flex bg-transparent">
				<button
					class="brightness-100 bg-transparent sliced-start-poll-border font-Cinzel border-8 md:border-30 active:brightness-75 hover:brightness-110 min-h-16 min-w-16 md:min-h-32 md:min-w-32 text-white rounded-lg bg-center bg-cover bg-transparent"
					>Create Poll</button
				>
			</div>
		</form>
	</div>
	<div class="bg-repeat-round bg-bluishblack">
		<div class="flex flex-col items-center">
			{#each $movieListStore as item}
				<MovieItem movieTitle={item?.title} />
			{/each}
		</div>

		<!--<object class="w-1/6 h-screen bg-repeat" data="hollyowwd lines.svg" type="image/svg+xml"></object> -->
	</div>
</div>
