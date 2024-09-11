<script lang="ts">
	import heroImage from '$lib/images/movie-night-polls-2.gif';


	

</script>

<div class="w-screen bg-bluishblack">
	<div class="relative">
		<img
			class="relative container mx-auto size-1/6 object-center"
			src={heroImage}
			alt="movie night polls"
		/>
	</div>
</div>
<div class="bg-bluishblack">
	<div class="bg-bluishblack lg:mx-36 p-5 md:sliced-border border-50">
		<h3 class="mb-5 text-xl text-center text-white font-Cinzel font-bold">Choose type of poll:</h3>
		<ul class="grid gap-4 w-full md:grid-cols-2 ">
			<li class="sliced-start-poll-border md:border-30">
				<input
					type="radio"
					name="voting-option"
					id="simple-option"
					value="simple"
					class="hidden peer h-full"
					required
				/>
				<label
					for="simple-option"
					class="inline-flex justify-between items-center p-5 w-full h-full text-gray-500 bg-white rounded-sm border-2 peer-checked:border-8 border-bluishblack cursor-pointer peer-checked:border-yellow-500 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-amber-50"
					><div class="block">
						<div class="w-full text-xl font-semibold font-Cinzel">Simple</div>
						<div class="w-full text-md font-serif">
							Select movies to vote on. Poll is decided by movie with most votes
						</div>
					</div></label
				>
			</li>
			<li class="sliced-start-poll-border md:border-30">
				<input
					type="radio"
					name="voting-option"
					id="instant-runoff"
					value="instant-runoff"
					class="hidden peer"
				/>
				<label
					for="instant-runoff"
					class="inline-flex justify-between items-center p-5 w-full h-full text-gray-500 bg-white rounded-sm border-2 peer-checked:border-8 border-bluishblack cursor-pointer peer-checked:border-yellow-500 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-amber-50"
					><div class="block">
						<div class="w-full text-lg font-semibold font-Cinzel">Instant-runoff</div>
						<div class="w-full text-sm font-serif">
							Rank each movie. If movie has more than half of the first-chocie votes then that movie
							wins. Else the loser second choice movies are used.
						</div>
					</div></label
				>
			</li>
			<li class="sliced-start-poll-border md:border-30">
				<input type="radio" name="voting-option" id="sculze" value="sculze" class="hidden peer" />
				<label
					for="sculze"
					class="inline-flex justify-between items-center p-5 w-full h-full text-gray-500 bg-white rounded-sm border-2 peer-checked:border-8 border-bluishblack cursor-pointer peer-checked:border-yellow-500 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-amber-50"
					><div class="block">
						<div class="w-full text-lg font-semibold font-Cinzel">Schulze</div>
						<div class="w-full text-sm font-serif">
							Rank candidates. Ties are allowed in ranking. Voters do not have to vote for each
							canidate.
						</div>
					</div></label
				>
			</li>
			<li class="sliced-start-poll-border md:border-30">
				<input type="radio" name="voting-option" id="borda" value="borda" class="hidden peer" />
				<label
					for="borda"
					class="inline-flex justify-between items-center p-5 w-full h-full text-gray-500 bg-white rounded-sm border-2 peer-checked:border-8 border-bluishblack cursor-pointer peer-checked:border-yellow-500 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-amber-50"
					><div class="block">
						<div class="w-full text-lg font-semibold font-Cinzel">Borda</div>
						<div class="w-full text-sm font-serif">
							Each voter ranks most prefered movie to least. Movies receive points for each rank.
							Movie with most points wins
						</div>
					</div></label
				>
			</li>
			<li class="sliced-start-poll-border md:border-30">
				<input
					type="radio"
					name="voting-option"
					id="weighted-random"
					value="weighted-random"
					class="hidden peer"
				/>
				<label
					for="weighted-random"
					class="inline-flex justify-between items-center p-5 w-full h-full text-gray-500 bg-white rounded-sm border-2 peer-checked:border-8 border-bluishblack cursor-pointer peer-checked:border-yellow-500 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-amber-50"
					><div class="block">
						<div class="w-full text-lg font-semibold font-Cinzel">Weighted Random</div>
						<div class="w-full text-sm font-serif">
							Each person selects movies to vote on. The more votes a movie has the higher chance it
							has to win.
						</div>
					</div></label
				>
			</li>
			<li class="sliced-start-poll-border md:border-30">
				<input
					type="radio"
					name="voting-option"
					id="ranked-pairs"
					value="ranked-pairs"
					class="hidden peer"
				/>
				<label
					for="ranked-pairs"
					class="inline-flex justify-between items-center p-5 w-full h-full text-gray-500 bg-white rounded-sm border-2 peer-checked:border-8 border-bluishblack cursor-pointer peer-checked:border-yellow-500 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-amber-50"
					><div class="block">
						<div class="w-full text-lg font-semibold font-Cinzel">Ranked Pairs</div>
						<div class="w-full text-sm font-serif">
							Each voter ranks movies. The Condorcet winner is decided.
						</div>
					</div></label
				>
			</li>
		</ul>
	</div>
</div>
