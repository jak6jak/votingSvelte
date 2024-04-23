<script lang="ts">
    import { createEventDispatcher } from 'svelte';
	export let MovieData: IMovieData = [];
    const dispatch = createEventDispatcher();
	let dropDownVisible = false;

</script>

<div
	class="flex max-w-full flex-col mx-5 p-2 my-2 bg-white grow md:sliced-border  overflow-x-scroll min-w-full sm:sliced-input-border sm:border-0 md:border-100 drop-shadow-lg"
>
	<div class="grid grid-flow-col gap-6">
		{#each MovieData as movie, i}
        <button on:click={(e) => {
            dispatch('changeMovie', {i});
        }}>
			<div class="p-5 min-w-64  border-30 sliced-start-poll-border">
				<img
					class="w-36 h-36 shrink-0 align-center"
					src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}.jpeg`}
				/>
				<p class="text-center">{movie.title}</p>
                <p class="text-center">{movie.release_date.substring(0, 4)}</p>
			</div>
            </button>
		{/each}
	</div>
</div>
