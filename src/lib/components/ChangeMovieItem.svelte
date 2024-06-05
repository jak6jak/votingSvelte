<script lang="ts">
    import { createEventDispatcher } from 'svelte';
	export let MovieData: IMovieData = [];
    const dispatch = createEventDispatcher();
	let dropDownVisible = false;

</script>

<div
	class="flex max-w-full flex-col mx-5 p-2 my-2 bg-white grow md:sliced-border  overflow-x-scroll min-w-full sm:sliced-input-border sm:border-0 md:border-50"
>
<p>Choose different movie:</p>
	<div class="flex flex-row gap-4 grow ">
		{#each MovieData as movie, i}
        <button on:click={(e) => {
            dispatch('changeMovie', {i});
        }}>
			<div class="lg:w-64 border-8 sliced-start-poll-border p-5">
				<img
					class="md:w-36 md:h-36 align-center"
					src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}.jpeg`}
				/>
				<p class="text-center">{movie.title}</p>
                <p class="text-center">{movie.release_date.substring(0, 4)}</p>
			</div>
            </button>
		{/each}
	</div>
</div>
