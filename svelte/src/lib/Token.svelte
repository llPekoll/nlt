<script lang="ts">
	import { marketplace, chainId, debugMode } from '$lib/settings.js';
	import nftl from '$lib/nftl.json';
	import { onMount } from 'svelte';
	import { ethers } from 'ethers';
	import { goto } from '$app/navigation';
	import Loader from '$lib/Loader.svelte';

	export let nft;
	export let detailsVisible;

	let account;

	let message;
	let meta;
	let attributes;
	let collection;
	let tags;
	let verified;
	let fee;
	let feeDisp;

	let owner;
	let isOwner;
	let isListed;

	onMount(async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(marketplace.address, marketplace.abi, signer);

		// get current account
		const accounts = await window.ethereum
			.request({
				method: 'eth_requestAccounts'
			})
			.catch((err) => {
				console.log(err.code);
			});
		account = accounts[0];

		// Meta mask request for correct blockchain
		await ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [
				{
					chainId
				}
			]
		});

		// get fee in bnb for
		const getBNBFeesDisplay = async () => {
			let taxes = await fetch(`/query/mycom/${nft.price}`);
			const { value } = await taxes.json();

			const listingPrice = ethers.utils.parseUnits(value.value, 'ether');
			let feeBlockchain = await contract.getListingPrice();
			feeBlockchain = feeBlockchain.toString();

			fee = (parseInt(listingPrice.toString()) + parseInt(feeBlockchain)).toString();
			feeDisp = (parseInt(fee) / 10 ** 19).toFixed(5);
		};
		await getBNBFeesDisplay();

		// definition isListed isOwner
		const res = await fetch(`/query/nft/${nft.tokenId}`);
		meta = await res.json();
		attributes = meta.nft.attributes;
		collection = meta.nft.collection;
		tags = meta.nft.tags;
		verified = meta.nft.verified;

		owner =
			nft.owner.toLowerCase() == account.toLowerCase() ||
			nft.seller.toLowerCase() == account.toLowerCase();
		isListed = nft.owner.toLowerCase() == marketplace.address.toLowerCase();
		isOwner = owner;
		console.log('meta');
		console.log(isListed);
		console.log(isOwner);
		console.log(account);
		console.log('seller', nft.seller);
		console.log('owner', nft.owner);
	});

	const buyNFT = async (tokenId) => {
		if (
			!window.confirm(
				`Are you sure? Do you really want to purchase this NFT?\nit's about ${meta.nft.price}$NFTL and ~${feeDisp}$BNB fees`
			)
		) {
			return;
		}
		message = '/==== Gettings Contract ====/';
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(marketplace.address, marketplace.abi, signer);

		const NFTLcontract = new ethers.Contract(nftl.address, nftl.abi, signer);
		if(!debugMode){
			const toPay = ethers.utils.parseUnits(`${nft.price}.0`, 9);
			message = '/==== Payment in NFTL ====/';
			try {
				await NFTLcontract.transfer(nft.seller, toPay);
			} catch (e) {
				console.log(`error ${JSON.stringify(e)}`);
			}
		}

		message = '/==== Transfer NFT ====/';
		try {
			const transaction = await contract.createMarketSale(nft.tokenId, {
				value: fee
			});
			await transaction.wait();
		} catch (e) {
			console.log(`error ${JSON.stringify(e)}`);
		}
		message = '/==== NFT Transfered ====/';
		alert('You successfully bought the NFT!');
		goto('/mynfts');
	};

	let hidden = nft.is_hidden;
	const updatenft = async (e) => {
		let body = {};
		if (e == 'list') {
			body = { is_hidden: hidden };
		} else if (e == 'price') {
			body = { price: nft.price };
		}
		fetch(`/query/nft/${nft.tokenId}`, {
			method: 'PATCH',
			body: JSON.stringify(body)
		});
	};

	const listOnMarket = async (e) => {
		if (!window.confirm('Are you sure? Do you really want to list this NFT?')) {
			return;
		}
		message = '/==== Gettings Contract ====/';
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(marketplace.address, marketplace.abi, signer);

		let listingPrice = await contract.getListingPrice();
		listingPrice = listingPrice.toString();

		message = '/==== Listing For Resale ====/';

		const prix = ethers.utils.parseUnits('1', 'ether');
		const transaction = await contract.resellToken(nft.tokenId, prix, { value: listingPrice });
		await transaction.wait();
		message = 'push results';
		const res = await fetch(`/query/nft/${nft.tokenId}`, {
			method: 'PATCH',
			body: JSON.stringify({ listed: true, price: nft.price })
		});
		message = '/==== NFT Listed ====/';
		alert('You successfully Listed the NFT!');
		goto('/mynfts');
	};
</script>

<div
	class="wrapper fixed ml-5"
	on:click={() => {
		detailsVisible = false;
	}}
>
	<div class="icon facebook">
		<div class="tooltip">Back</div>
		<svg width="1em" height="1em" viewBox="0 0 24 24"
			><path
				fill="currentColor"
				d="m10.875 19.3l-6.6-6.6q-.15-.15-.213-.325Q4 12.2 4 12t.062-.375q.063-.175.213-.325l6.6-6.6q.275-.275.687-.288q.413-.012.713.288q.3.275.313.687q.012.413-.288.713L7.4 11h11.175q.425 0 .713.287q.287.288.287.713t-.287.712Q19 13 18.575 13H7.4l4.9 4.9q.275.275.288.7q.012.425-.288.7q-.275.3-.7.3q-.425 0-.725-.3Z"
			/></svg
		>
	</div>
</div>
<section class="flex items-center justify-center py-20">
	<div class="w-4/5 flex rounded-lg shadow-lg shadow-white">
		{#if nft}
			<img src={nft.image} alt="nft" class="vv rounded-tl-lg rounded-bl-lg" />

			<div class="bg-gray-100 rounded-tr-lg rounded-br-lg w-2/3 p-4 pl-6">
				<p class="text-3xl font-bold italic capitalize pt-7">{nft.name}</p>
				<p class=" ml-5 text-gray-600 italic pb-7">- {nft.description}.</p>
				<p class="text-xl font-bold italic capitalize">collection</p>
				<p class="ml-5 text-gray-600 italic pb-7">- {collection}.</p>
				<p class="text-xl font-bold italic capitalize">Attributes</p>
				{#if attributes}
					{#each attributes as { trait_type, value }}
						<ul class="ml-5 text-gray-600 italic">
							<li>
								<p>- {trait_type}: {value}</p>
							</li>
						</ul>
					{/each}
				{/if}
				<p class="text-xl font-bold italic capitalize pt-7">Tags:</p>
				<ul class="ml-5 comma-list">
					{#if tags}
						{#each tags as tag}
							<li class="inline">
								<p class="text-blue-500 inline">#{tag}</p>
							</li>
						{/each}
					{/if}
				</ul>
				{#if isOwner}
					{#if isListed}
						<!-- NFT ready to be bought -->
						<p class="mt-10 text-red-500 italic font-semibold text-right">
							NFT Listed On The Way to Be sold we Wish you Luck!
						</p>
					{:else}<!-- Here we setup the price and list it -->
						<form class="pt-7">
							<input
								type="checkbox"
								class="checkbox-input"
								id="checkbox"
								name="is-hidden"
								bind:checked={hidden}
								on:change={() => {
									updatenft('list');
								}}
							/>
							<!-- <label for="checkbox">
									<span class="checkbox" />
									<p class=" text-sm text-gray-500 inline ml-2 absolute">Hide the NFT</p>
								</label> -->
						</form>
						<form
							class="pt-7"
							on:submit|preventDefault={() => {
								updatenft('price');
							}}
						>
							<div class="">
								<div class="relative z-0 mb-6 group">
									<input
										type="number"
										name="price"
										class="block py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
										required
										bind:value={nft.price}
									/>
									<label
										for="floating_email"
										class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
										>Set Price:</label
									>
								</div>
								<button
									type="submit"
									class="bg-blue-500 rounded-lg py-2 px-14  my-7 text-white float-right ml-5"
									on:click|once={() => listOnMarket(nft.tokenId)}
								>
									List For sale</button
								>
							</div>
						</form>
					{/if}
				{:else}
					<!-- no the owner just a simple other visitor -->
					{#if isListed}
						<!-- Buy the NFT -->
						<button
							class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-10 float-right ml-5"
							on:click|once={() => buyNFT(nft.tokenId)}
						>
							Buy
						</button>
						<!-- <button
								class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-10 float-right ml-5"
								on:click|once={() => buyNFTBlockChain(nft.tokenId)}
							>
								Buy this NFT BlockChain
							</button>
							<button
								class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-10 float-right ml-5"
								on:click|once={() => buyNFTBlockChainTax(nft.tokenId)}
							>
								Buy this NFT BlockChainTax
							</button> -->
					{:else}
						<!-- can't do nothing nft not for sale -->
						<p class="text-right italic text-lg font-semibold text-red-500 mt-10">NFT not Listed</p>
					{/if}
				{/if}
				{#if isListed}
					<p class="text-xl text-right pt-12 pr-5">
						<span class="text-xs font-thin">Price:</span>{nft.price}<span class="font-bold italic"
							>$NFTL</span
						>
					</p>
					<div class="clear-both text-right -pt-10 text-xs">
						*make sure you have a least <span class="text-normal">~ {feeDisp}BNB</span> to complete the
						transaction
					</div>
				{:else}
					<p class="text-xl text-right pt-10 ">
						<span class="text-xs font-thin">Price:</span>{nft.price}<span class="font-bold italic"
							>$NFTL</span
						>
					</p>
				{/if}

				{#if message}
					<div class="flex items-center justify-center w-full pb-4">
						{message}
					</div>
					<div class="w-1/6 mx-auto filter-green">
						<Loader version="1" />
					</div>
				{/if}
			</div>
		{/if}
	</div>
</section>

<style>
	.vv {
		width: 100%;
		max-width: 400px;
	}
	.filter-green {
		filter: invert(0%) sepia(100%) saturate(7500%) hue-rotate(234deg) brightness(118%) contrast(87%);
	}
	.comma-list li::after {
		content: ', ';
	}
	.comma-list li:last-child::after {
		content: '';
	}
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
		border: 1px solid blue;
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
		background-color: blue;
		border-radius: 3px;
		transition: 0.3s;
	}
	.wrapper .icon {
		position: relative;
		background-color: #ffffff;
		border-radius: 50%;
		padding: 15px;
		margin: 10px;
		width: 50px;
		height: 50px;
		font-size: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
		cursor: pointer;
		transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}

	.wrapper .tooltip {
		position: absolute;
		top: 0;
		font-size: 14px;
		background-color: #ffffff;
		color: #ffffff;
		padding: 5px 8px;
		border-radius: 5px;
		box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
		opacity: 0;
		pointer-events: none;
		transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}

	.wrapper .tooltip::before {
		position: absolute;
		content: '';
		height: 8px;
		width: 8px;
		background-color: #ffffff;
		bottom: -3px;
		left: 50%;
		transform: translate(-50%) rotate(45deg);
		transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}

	.wrapper .icon:hover .tooltip {
		top: -45px;
		opacity: 1;
		visibility: visible;
		pointer-events: auto;
	}

	.wrapper .icon:hover span,
	.wrapper .icon:hover .tooltip {
		text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
	}

	.wrapper .facebook:hover,
	.wrapper .facebook:hover .tooltip,
	.wrapper .facebook:hover .tooltip::before {
		background-color: #333;
		color: #ffffff;
	}
</style>
