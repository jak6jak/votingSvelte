<script lang="ts" type="module">
	import { onMount } from 'svelte';
	import { movieListStore } from '$lib/stores/stores';
	export let movieTitle = 'Error';

	//let movieData : IMovieData[];
	let movieIndex = 0;
	function createURLSlug(text: string) {
		return text
			.toString() // Convert to string
			.normalize('NFD') // Normalize to Normal Form Decomposed to separate accents from letters
			.replace(/[\u0300-\u036f]/g, '') // Remove diacritical marks
			.toLowerCase() // Convert to lowercase
			.trim() // Trim whitespace from both sides
			.replace(/\s+/g, '-') // Replace spaces with hyphens
			.replace(/[^\w\-]+/g, '') // Remove all non-word characters (alphanumeric + underscore + hyphen)
			.replace(/\-\-+/g, '-'); // Replace multiple hyphens with a single hyphen
	}

	$: moviePromise = (async function getData(_movieTitle: string) {
		console.log(_movieTitle);
		
		const response = await fetch('/getMovieData?movieTitle=' + createURLSlug(_movieTitle));
		let movieData: IMovieData[] = await response.json();
		console.log(movieData);
		return movieData;
	})(movieTitle);

	function removeSelf(){
		movieListStore.update((value) => {

			return value.filter((element) => element.title !== movieTitle);
		
		});
	}

</script>

{#await moviePromise}
	<div
		class="flex flex-row mx-5 p-2 my-2 bg-white shrink md:sliced-border min-w-full sm:sliced-input-border sm:border-0 md:border-100 drop-shadow-lg"
	>
		<div class="w-16 h-24 col-span-1 shrink-0 mx-1">
			<img alt="movie poster" class="w-full h-full" />
		</div>
		<div class="justify-center w-full">
			<h1 class="text-xl text-ellipsis font-Cinzel font-bold">movieTitle</h1>
			<h1 class=" font-serif text-sm inline text-gray-600">loading..</h1>
			<br />
			<p class=" font-serif text-sm inline text-gray-900">loading...</p>

			<p class=" font-serif text-base mr-5 max-w-prose line-clamp-6">Still loading...</p>
		</div>
		<div class=" bg-cover">
			<button
				class="bg-[url('$lib/images/dots.webp')] min-w-8 min-h-8 bg-no-repeat hover:brightness-200 bg-contain"
			>
			</button>
		</div>
	</div>
{:then data}
	<div
		class="flex flex-row mx-5 p-2 my-2 bg-white grow md:sliced-border min-w-full sm:sliced-input-border sm:border-0 md:border-100 drop-shadow-lg"
	>
		<div class="w-16 h-24 shrink-0 mx-1">
			<img
				src={`https://image.tmdb.org/t/p/w500/${data[movieIndex]?.poster_path}.jpeg`}
				alt="movie poster"
				class="w-full h-full"
			/>
		</div>
		<div class="justify-center w-full">
			{#if data[movieIndex].title == undefined}
			<h1 class="text-xl text-ellipsis font-Cinzel font-bold">{movieTitle}</h1>
			{:else}
			<h1 class="text-xl text-ellipsis font-Cinzel font-bold">{data[movieIndex].title}</h1>
			{/if}
			<h1 class=" font-serif text-sm inline text-gray-600">{data[movieIndex].runtime} min</h1>
			<br />
			<p class=" font-serif text-sm inline text-gray-900">{data[0].release_date.substring(0,4)}</p>

			<p class=" font-serif text-base mr-5  col-span-2 line-clamp-8">{data[movieIndex].overview}</p>
		</div>
		<div class=" bg-cover">
			<button
				class="bg-[url('$lib/images/dots.webp')] min-w-8 min-h-8 bg-no-repeat hover:brightness-200 bg-contain"
			>
			</button>
			<div class="absolute top-5 bg-bluishblack border-8 sliced-border divide-y shadow">
				<button class="text-white outline-1" on:click={removeSelf}>Remove Movie</button>
				<button class="text-white">Change Movie</button>
			</div>
		</div>
	</div>
{:catch error}
	<div
		class="flex flex-row mx-5 p-2 my-2 bg-white shrink md:sliced-border sm:sliced-input-border sm:border-0 md:border-100 drop-shadow-lg"
	>
		<div class="w-16 h-24 col-span-1 shrink-0 mx-1">
			<img
				alt="movie poster"
				class="w-full h-full"
			/>
		</div>
		<div class="justify-center w-full">
			<h1 class="text-xl text-ellipsis font-Cinzel font-bold">{movieTitle}</h1>
			<h1 class=" font-serif text-sm inline text-gray-600">Unknown</h1>
			<br />
			<p class=" font-serif text-sm inline text-gray-900">Unknown</p>

			<p class=" font-serif text-base mr-5 max-w-prose line-clamp-6">Movie Not Found.</p>
		</div>
		<div class=" bg-cover">
			<button
				class="bg-[url('$lib/images/dots.webp')] min-w-8 min-h-8 bg-no-repeat hover:brightness-200 bg-contain"
			>
			</button>
		</div>
	</div>


{/await}
