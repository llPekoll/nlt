<script lang="ts">
	export let nft;
	let src = nft.image;
	const link = `/nft/${nft.tokenId}`;
</script>
<a href={link}>
	<div
		class=" w-52 my-2 px-2 lock p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-10"
	>
		<p class="text-center mx-auto pb-5">{nft.name}</p>
		<img {src} alt="nft" class="w-40 text-center mx-auto" />
		<p class="text-xs text-justify py-5">{nft.description}</p>
		<p>{nft.price}$BNB</p>
		<!-- <p class="text-center mx-auto pb-5">lives:{nft.attributes.lives}</p> -->
		<!-- <p class="text-center mx-auto pb-5">Ticket Reduction:{nft.attributes.ticketPrice}</p> -->
	</div>

</a>