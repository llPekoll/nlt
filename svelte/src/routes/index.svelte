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
	import { paginate, LightPaginationNav } from 'svelte-paginate'


	export let trad;
	let rstNft = {
						price: 1,
						tokenId: "jose",
						seller: 'sell',
						owner: 'own',
						image: 'img',
						name: 'metta',
						description: 'sako',
						verified: true,
						tags: ['jose'],
						attributes: []
					};
	let nfts = [];

	// let loadingState = 'not-loaded';
	let empty = true;
	let pageIndex: number = 1;
	let account;
	let onlyVerified = false;
	let updateCu;
	let tagsFilterelts;

	let items = nfts;
	let currentPage = 1
	let pageSize = 4
	let searchTerm='';
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
						attributes: back.nft.attributes,
						collection: back.nft.collection
					};
					return item;
				})
			);
			return items;
		};
		nfts = await loadNFTs();
		items = nfts.reverse();
		paginatedItems = paginate({ items, pageSize, currentPage })
	});
	$: paginatedItems = paginate({ items, pageSize, currentPage })
	const changePage = async (e) => {
		pageIndex += e;
		const res = await fetch(`/query/nfts/${pageIndex}`);
		nfts = await res.json();
	};
	let selectedNft = '';
	let detailsVisible = false;	
	$: searchForNFt = nfts.filter((nft)=>{
		let collection = nft.collection? nft.collection: '';
		return nft.name.includes(searchTerm) || collection.includes(searchTerm) || nft.tags.toString().includes(searchTerm)
	})
	$: console.log(searchForNFt)
	$: console.log(searchTerm)
</script>

{#if detailsVisible}
	<p in:fly={{ x: 100, duration: 500 }}>
		<Token nft={selectedNft} {account} bind:detailsVisible />
	</p>
{:else}
	<section in:fly={{ x: -100, duration: 500 }} class="py-5">
		{#if !empty}
			<p class="flex items-center justify-center">no items in the marketplace</p>
		{/if}

		<p class="flex items-center justify-center text-white text-3xl font-bold py-4 italic">
			NFTL Marketplace
		</p>
		{#if nfts}
		<div class="flex items-center justify-center">
			<form class='w-1/5'>
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
			<form>
				<input
					type="text"
					bind:value={searchTerm}
					class="rounded"
				/>
				<label for="checkbox">
					<p class=" text-sm text-white inline ml-2 absolute pt-0.5">Filter by name, collection or tag</p>
				</label>
			</form>
		</div>
		
		{/if}
	</section>
{#if searchTerm}
<ul class="items">
  {#each searchForNFt as item}
      	<button
			on:click={() => {
				detailsVisible = true;
				selectedNft = item;
			}}
			class=" bg-white hover:bg-gray-100 rounded-lg hover:scale-105 transition-transform m-4 shadow"
		>
			<Card nft={item} toDispay="false" {onlyVerified} />
		</button>
  {/each}
</ul>
{:else}
	<ul class="flex-wrap items-center justify-center mx-auto text-center">
	{#each paginatedItems as item}
			<button
				on:click={() => {
					detailsVisible = true;
					selectedNft = item;
				}}
				class=" bg-white hover:bg-gray-100 rounded-lg hover:scale-105 transition-transform m-4 shadow"
			>
				<Card nft={item} toDispay="false" {onlyVerified} />
			</button>
	{/each}
	</ul>
	<div class=" mx-auto text-center w-1/2 py-10">
	<LightPaginationNav
	totalItems="{items.length}"
	pageSize="{pageSize}"
	currentPage="{currentPage}"
	limit="{1}"
	showStepOptions="{true}"
	on:setPage="{(e) => currentPage = e.detail.page}"
	/>
</div>
{/if}

{/if}

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
	/* input */
</style>
