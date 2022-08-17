<script lang="ts">
	export let nft;
	export let toDispay;
	let src = nft.image;
	const link = `/nft/${nft.tokenId}`;
	let price = nft.price;
	// console.log(nft.price)
	// if (nft.price.split('.').pop() == 0){
	// price = nft.price.split('.').shift()
	// }
	// let owner = `${nft.owner.substring(0,4)}...${nft.owner.slice(-4)}`
	const hidden = nft.is_listed || !toDispay;
</script>

{#if hidden}
	<a
		href={link}
		class=" bg-white hover:bg-gray-100 rounded-lg hover:scale-105 transition-transform m-4 shadow"
	>
		<img {src} alt="nft" class="w-60 h-60 text-center mx-auto rounded-t-lg" />
		<p class="-mt-7 italic font-bold pl-5 pr-2 text-white drop-shadow-md bg-gray-900 w-12">
			#{nft.tokenId}.
		</p>
		<div class=" w-60 pt-4  rounded-b-lg border shadow-md  ">
		{#if nft.verified}
			<img src='badge.svg' alt=badge class="w-7 h-7 -mt-2 vv float-right"/>
		{/if }
			<p class=" px-4 text-left font-bold text-xl">{nft.name}</p>
			<p class="px-4 text-xs ml-4 text-gray-600 font-light pb-6">- {nft.description}</p>
			<div class="text-right ">
				<!-- <p class="text-sm font-thin text-gray-500 -mb-1">owner</p>
			<p class="text-gray-900 italic">{owner}</p>
		</div> -->
				<div class="text-sm font-light bg-gray-200 text-right px-2 py-2 rounded-b-lg ">
					<p>
						price:
						<span class="font-bold text-lg italic">
							{price}$NFTL
							<span /></span
						>
					</p>
				</div>
			</div>
		</div></a
	>
{/if}

<style>
.vv{
	z-index: 10!important;
}
</style>