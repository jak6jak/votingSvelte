<script lang="ts">
    import heroImage from "$lib/images/movie-night-polls-2.gif";

	import MovieItem from "$lib/components/MovieItem.svelte";

	let userMovieInput ="";
	$: userMovieInputList = userMovieInput.split("\n");

	function handlePaste(event: ClipboardEvent){
		//pasted data now we fetch
		
	}
	let timer;
	const debounce = v => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			userMovieInput = v;
		}, 750);
	}
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
	<form class="w-full flex">
		<div class="flex">
			<button 
				class="brightness-100 active:brightness-75 hover:brightness-110 bg-[url('$lib/images/plusButton.webp')] min-h-16 min-w-16 md:min-h-32 md:min-w-32 text-bluishblack rounded-lg bg-center text-white bg-cover"
				>+</button
			>
		</div>
		<div
			class=" md:mx-5 hover:brightness-110 sticky grow top-0 sliced-input-border md:border-30 border-8"
		>
			<textarea on:paste={handlePaste} class=" w-full h-full" on:keyup={({ target: { value } }) => debounce(value)}></textarea>
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
			{#each userMovieInputList as item}
				<MovieItem movieTitle={item}/>
			{/each}
			
		</div>

		<!--<object class="w-1/6 h-screen bg-repeat" data="hollyowwd lines.svg" type="image/svg+xml"></object> -->
	</div>
</div>
