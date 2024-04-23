<script lang="ts" type="module">
	import { movieListStore } from '$lib/stores/stores';
	import ChangeMovieItem from '$lib/components/ChangeMovieItem.svelte';
	import { State } from '$lib';
	import ViewMovieItem from './ViewMovieItem.svelte';
	export let movieTitle = 'Error';
	let movieIndex = 0;

	let state = State.view;

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

	function removeSelf() {
		console.log('Removing: ' + movieTitle);
		movieListStore.update((value) => {
			return value.filter((element) => element.title !== movieTitle);
		});
	}
	function changeMovie(event) {
		movieIndex = event.detail.i;
		state = State.view;
	}
	$: moviePromise = (async function getData(_movieTitle: string) {
		console.log(_movieTitle);

		const response = await fetch('/getMovieData?movieTitle=' + createURLSlug(_movieTitle));
		let movieData: IMovieData[] = await response.json();
		console.log(movieData);
		return movieData;
	})(movieTitle);
</script>

{#await moviePromise}
	<ViewMovieItem
		{movieTitle}
		UsermovieTitle={movieTitle}
		poster_path={''}
		runtime={0}
		release_date={'Loading'}
		genre_ids={['Loding']}
		overview={'Loading Movie Data...'}
	></ViewMovieItem>
{:then data}
	{#if state == State.view}
		<ViewMovieItem
			movieTitle={data[movieIndex].title}
			UsermovieTitle={movieTitle}
			poster_path={data[movieIndex]?.poster_path}
			runtime={data[movieIndex].runtime}
			release_date={data[movieIndex].release_date.substring(0, 4)}
			genre_ids={data[movieIndex].genre_ids}
			overview={data[movieIndex].overview}
			on:changeMovie={() => {
				state = State.edit;
			}}
			on:removeMovie={() => {
				removeSelf();
			}}
		></ViewMovieItem>
	{:else if state == State.edit}
		<ChangeMovieItem MovieData={data} on:changeMovie={changeMovie}></ChangeMovieItem>
	{/if}
{:catch error}
	<ViewMovieItem
		{movieTitle}
		UsermovieTitle={movieTitle}
		poster_path={''}
		runtime={0}
		release_date={'Not Found'}
		genre_ids={['']}
		overview={'No Movie Data Found'}
	></ViewMovieItem>
{/await}
