<script lang="ts">
	import { movieListStore } from '$lib/stores/stores';
    import state from './ViewMovieItem.svelte';
    import { createEventDispatcher } from 'svelte';
	export let UsermovieTitle = 'Error';
	export let movieTitle = 'Error';
	export let poster_path: String;
	export let runtime: number;
	export let release_date: String;
	export let genre_ids : string[];
	export let overview: string;
	let dropDownVisible = false;


    const dispatch = createEventDispatcher();

    function changeMovie() {
        dispatch('changeMovie');
    }
    function removeMovie(){
        dispatch('removeMovie');
    
    }
</script>

<div
	class="flex flex-col mx-5 p-2 my-2 bg-white grow md:sliced-border min-w-full sm:sliced-input-border sm:border-0 md:border-100 drop-shadow-lg"
>
	<div class="flex">
		<div class="w-16 h-24 shrink-0 mx-1">
			<img
				src={`https://image.tmdb.org/t/p/w500/${poster_path}.jpeg`}
				alt="movie poster"
				class="w-full h-full"
			/>
		</div>
		<div class="justify-center flex-col grow">
			{#if movieTitle == undefined}
				<h1 class="text-xl text-ellipsis font-Cinzel font-bold">{UsermovieTitle}</h1>
			{:else}
				<h1 class="text-xl text-ellipsis font-Cinzel font-bold">{movieTitle}</h1>
			{/if}
			<h1 class=" font-serif text-sm inline text-gray-900">
				{runtime} min, {release_date}
			</h1>
			<br />
			{#each genre_ids as item}
				<p class=" font-serif text-sm inline text-gray-900">{item + ', '}</p>
			{/each}
			<br />
		</div>

		<div class=" bg-cover">
			
            <button
				on:click={() => {
					dropDownVisible = !dropDownVisible;
				}}
				class="bg-[url('$lib/images/dots.webp')] min-w-8 min-h-8 bg-no-repeat hover:brightness-200 bg-contain"
			>
			</button>
			{#if dropDownVisible}
				<div
					class="absolute top-5 bg-bluishblack border-8 sliced-start-poll-border divide-y shadow"
				>
					<button class="text-white outline-1" on:click={removeMovie}>Remove Movie</button>
					<button class="text-white" on:click={changeMovie}>Change Movie</button>
				</div>
			{/if}
		</div>
	</div>
	<p class=" font-serif text-base mr-5 col-span-2 line-clamp-8">{overview}</p>
</div>
