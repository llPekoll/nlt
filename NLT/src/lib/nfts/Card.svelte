<script lang="ts">
	export let nlt;
	let src: string = nlt.image;
</script>

<div>
	<div
		class="lock p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-10"
	>
		<p class="text-center mx-auto pb-5">{nlt.name}</p>
		<img {src} alt="nlt" class="w-40 text-center mx-auto" />
		<p class="text-xs text-justify py-5">{@html nlt.descriptionHTML}</p>
		<p class="text-center mx-auto pb-5">lives:{nlt.attributes.lives}</p>
		<p class="text-center mx-auto pb-5">Ticket Reduction:{nlt.attributes.ticketPrice}</p>
	</div>
</div>
