<script lang="ts">
	import Loader from './../lib/Loader.svelte';
	import { marketplace, chainId, withdrawl } from '$lib/settings.js';
	import { ethers } from 'ethers';
	import Share from '$lib/Share.svelte';
	import { onMount } from 'svelte';
	import Card from '$lib/nfts/Card.svelte';
	import Token from '$lib/Token.svelte';
	import { fade, fly } from 'svelte/transition';
	import Footer from '$lib/Footer.svelte';

	export let trad;
	let nfts;

	// let loadingState = 'not-loaded';
	let empty = true;
	let pageIndex: number = 1;
	let account;
	let onlyVerified = false;
	let updateCu;
	let tagsFilterelts;
	onMount(async () => {
		const loadNFTs = async () => {
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
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(marketplace.address, marketplace.abi, signer);
			let transaction = await contract.fetchMarketItems();
			if (withdrawl) {
				await contract.withdraw();
			}
			let items = await Promise.all(
				transaction.map(async (i) => {
					const tokenUri = await contract.tokenURI(i.tokenId);
					let meta = await fetch(tokenUri);
					meta = await meta.json();
					let back = await fetch(`/query/nft/${i.tokenId}`);
					back = await back.json();
					// let price = ethers.utils.formatUnits(meta.price,'ether');
					let item = {
						price: back.nft.price,
						tokenId: i.tokenId.toString(),
						seller: i.seller,
						owner: i.owner,
						image: meta.image,
						name: meta.name,
						description: meta.description,
						verified: back.nft.verified,
						tags: back.nft.tags,
						attributes: back.nft.attributes
					};
					return item;
				})
			);
			return items;
		};
		nfts = await loadNFTs();
	});
	const changePage = async (e) => {
		pageIndex += e;
		const res = await fetch(`/query/nfts/${pageIndex}`);
		nfts = await res.json();
	};
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
			<p class="flex items-center justify-center">no items in the marketplace</p>
		{/if}

		<p class="flex items-center justify-center text-white text-3xl font-bold py-4 italic">
			NFTL Marketplace
		</p>
		{#if nfts}
			<form class="text-center mx-auto">
				<input
					name="is-hidden"
					type="checkbox"
					class="checkbox-input"
					id="checkbox"
					bind:checked={onlyVerified}
				/>
				<label for="checkbox">
					<span class="checkbox" />
					<p class=" text-sm text-white inline ml-2 absolute">Only Verified</p>
				</label>
			</form>
			<!-- <form class="text-center mx-auto">
				<input
					type="text"
					bind:checked={tagsFilterelts}
				/>
				<label for="checkbox">
					<span class="checkbox" />
					<p class=" text-sm text-white inline ml-2 absolute">Filter By</p>
				</label>
			</form> -->
			<div class="flex flex-wrap items-center justify-center">
				{#each nfts as nft}
					<button
						on:click={() => {
							detailsVisible = true;
							selectedNft = nft;
						}}
						class=" bg-white hover:bg-gray-100 rounded-lg hover:scale-105 transition-transform m-4 shadow"
					>
						<Card {nft} toDispay="false" {onlyVerified} />
					</button>
				{/each}
			</div>
		{/if}
	</section>
{/if}

<div class="flex flex-col items-center">
	<!-- Help text -->
	<span class="text-sm text-white dark:text-gray-400">
		<!-- Showing <span class="font-semibold text-gray-300 dark:text-white">{nfts.first_entry}</span> -->
		<!-- to <span class="font-semibold text-gray-300 dark:text-white">{nfts.last_entry}</span> of -->
		<!-- <span class="font-semibold text-gray-300 dark:text-white">{nfts.total_entry}</span> Entries -->
	</span>
	<div class="inline-flex mt-2 xs:mt-0">
		<!-- Buttons -->
		<!-- {#if nfts.total_entry > 10}

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
                                {/if} -->
		<!-- {#if nfts.last_entry == nfts.total_entry}

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
                                {/if} -->
		<!-- {/if} -->
	</div>
</div>
<Footer {trad} />

<style>
	.box {
		width: 100%;
		height: 90vh;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		align-content: center;
	}

	.checkbox-bipolar-input {
		display: none;
	}

	.checkbox-bipolar-input:checked + label .checkbox-bipolar:after {
		left: 18px;
		right: 2px;
	}

	.checkbox-bipolar-input:checked + label .checkbox-bipolar .on {
		opacity: 0.5;
	}

	.checkbox-bipolar-input:checked + label .checkbox-bipolar .off {
		opacity: 0;
	}

	.checkbox-bipolar {
		margin-right: 15px;
		width: 36px;
		height: 20px;
		border-radius: 10px;
		border: 1px solid #6a1ad0;
		display: inline-block;
		position: relative;
	}

	.checkbox-bipolar:after {
		content: '';
		display: block;
		position: absolute;
		background: #6a1ad0;
		left: 2px;
		top: 2px;
		bottom: 2px;
		right: 18px;
		border-radius: 8px;
		transition: all 0.3s;
	}

	.checkbox-bipolar .on {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 6px;
		opacity: 0;
		transition: 0.3s;
		font-family: sans-serif;
		font-size: 14px;
	}

	.checkbox-bipolar .off {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 5px;
		opacity: 0.5;
		font-family: sans-serif;
		transition: 0.3s;
		font-size: 14px;
	}

	.checkbox-input {
		display: none;
	}

	.checkbox-input:checked + label .checkbox:after {
		transform: translate(-50%, -50%) scale(1);
	}

	.checkbox {
		border: 1px solid #e0d9ea;
		border-radius: 3px;
		width: 16px;
		height: 16px;
		display: inline-block;
		position: relative;
	}

	.checkbox:after {
		content: '';
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(0);
		width: 12px;
		height: 12px;
		background-color: #e0d9ea;
		border-radius: 3px;
		transition: 0.3s;
	}
</style>
