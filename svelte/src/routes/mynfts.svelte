<script lang="ts">
	import { marketplace, chainId } from '$lib/settings.js';
	import { onMount } from 'svelte';
	import Card from '$lib/nfts/Card.svelte';
	import { fly } from 'svelte/transition';
	import Token from '$lib/Token.svelte';
	import { ethers } from 'ethers';
	import Footer from '$lib/Footer.svelte';

	export let trad;
	let nftsBought = [];
	let nftsListed = [];
	let empty = true;
	let pageIndex: number = 1;
	let first_entry;
	let last_entry;
	let total_entry;
	let account;
	onMount(async () => {
		const accounts = await window.ethereum
			.request({
				method: 'eth_requestAccounts'
			})
			.catch((err) => {
				console.log(err.code);
			});
		account = accounts[0];
		await ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [
				{
					chainId
				}
			]
		});
		const loadNFTs = async (e) => {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(marketplace.address, marketplace.abi, signer);
			let transaction;
			if (e == 1) {
				transaction = await contract.fetchMyNFTs();
			}
			if (e == 2) {
				transaction = await contract.fetchItemsListed();
			}
			let items = await Promise.all(
				transaction.map(async (i) => {
					const tokenUri = await contract.tokenURI(i.tokenId);
					let meta = await fetch(tokenUri);
					meta = await meta.json();
					// let price = ethers.utils.formatUnits(meta.price,'ether');
					let item = {
						price: meta.price,
						tokenId: i.tokenId.toString(),
						seller: i.seller,
						owner: i.owner,
						image: meta.image,
						name: meta.name,
						description: meta.description
					};
					return item;
				})
			);
			return items;
		};
		nftsBought = await loadNFTs(1);
		nftsListed = await loadNFTs(2);
	});
	let selectedNft = '';
	let detailsVisible = false;
</script>

{#if detailsVisible}
	<p in:fly={{ x: 100, duration: 500 }}>
		<Token nft={selectedNft} {account} bind:detailsVisible />
	</p>
{:else}
	<section in:fly={{ x: -100, duration: 500 }}>
		{#if !empty}
			<p class="flex items-center justify-center">you have no NFTs</p>
		{/if}

		<p class="flex items-center justify-center text-white">My Nfts</p>
		<div class="flex flex-wrap items-center justify-center">
			{#if nftsBought}
				<div class="flex flex-wrap items-center justify-center">
					{#each nftsBought as nft}
						<button
							on:click={() => {
								detailsVisible = true;
								selectedNft = nft;
							}}
							class=" bg-white hover:bg-gray-100 rounded-lg hover:scale-105 transition-transform m-4 shadow"
						>
							<Card {nft} toDispay="false" />
						</button>
					{/each}
				</div>
			{/if}
			{#if nftsListed}
				<div class="flex flex-wrap items-center justify-center">
					{#each nftsListed as nft}
						<button
							on:click={() => {
								detailsVisible = true;
								selectedNft = nft;
							}}
							class=" bg-white hover:bg-gray-100 rounded-lg hover:scale-105 transition-transform m-4 shadow"
						>
							<Card {nft} toDispay="false" />
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</section>
{/if}
<!-- <div class="flex flex-col items-center">

	<span class="text-sm text-white dark:text-gray-400">
		Showing <span class="font-semibold text-gray-300 dark:text-white">{first_entry}</span>
		to <span class="font-semibold text-gray-300 dark:text-white">{last_entry}</span> of
		<span class="font-semibold text-gray-300 dark:text-white">{total_entry}</span> Entries
	</span>
	<div class="inline-flex mt-2 xs:mt-0">

		{#if nfts.total_entry > 10}
			{#if pageIndex !== 1}
				<button
					class="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
				>
					<svg
						aria-hidden="true"
						class="mr-2 w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
							clip-rule="evenodd"
						/></svg
					>
					Prev
				</button>
			{/if}
			{#if nfts.last_entry == nfts.total_entry}
				<button
					class="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
				>
					Next
					<svg
						aria-hidden="true"
						class="ml-2 w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/></svg
					>
				</button>
			{/if}
		{/if}
	</div>
</div> -->
<Footer {trad} />
