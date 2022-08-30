<script lang="ts">
	import marketPlace from '$lib/Marketplace.json';
	import nftl from '$lib/nftl.json';
	import { onMount } from 'svelte';
	import { ethers } from 'ethers';
	import { goto } from '$app/navigation';

	export let trad;
	export let nft;

	let currAddress;
	let nftDataFromBlockChain;

	let nftOwner;
	let isListed;
	let message;

	onMount(async () => {
		const accounts = await window.ethereum
			.request({
				method: 'eth_requestAccounts'
			})
			.catch((err) => {
				console.log(err.code);
			});
		const account = accounts[0];
		currAddress = account;
		console.log(currAddress);
		const loadNFTs = async () => {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();

			const contract = new ethers.Contract(marketPlace.address, marketPlace.abi, signer);
			console.log('sako');
			const tokenUri = await contract.tokenURI(parseInt(tokenId) + 1);
			const listedToken = await contract.ownerOf(parseInt(tokenId) + 1);
			let meta = await fetch(tokenUri);

			meta = await meta.json();
			let item = {
				price: meta.price,
				tokenId: tokenId,
				// seller: listedToken.seller,
				owner: listedToken.owner,
				image: meta.image,
				name: meta.name,
				description: meta.description,
				attributes: nft.attributes,
				isHidden: nft.is_hidden,
				tags: nft.tags
			};
			console.log('listedToken.tokenId');
			console.log('owner');
			console.log(listedToken.owner);
			tokenId = listedToken.tokenId.toString();
			console.log(tokenId);
			nftOwner = false;
			isListed = true;
			console.log('isListed');
			console.log(isListed);
			return item;
		};
		nftDataFromBlockChain = await loadNFTs();
	});

	const buyNFT = async (tokenId) => {
		try {
			console.log(tokenId);
			message = 'gettings contract';
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const marketContract = new ethers.Contract(
				marketPlace.addressMarket,
				marketPlace.abiMarket,
				signer
			);
			const nftContract = new ethers.Contract(marketPlace.addressNFT, marketPlace.abiNFT, signer);
			// const NFTLcontract = new ethers.Contract(nftl.address, nftl.abi, signer);
			// const toPay = ethers.utils.parseUnits(`${nft.price}.0`, 9);
			// try {
			// 	let tx = await NFTLcontract.transfer(currAddress, toPay);
			// } catch (e) {
			// 	console.log('error', e);
			// 	return 0;
			// }
			message = 'fetching fees';
			let taxes = await fetch(`/query/mycom/${nft.price}`);
			const { value } = await taxes.json();
			console.log('jar');
			console.log(tokenId);
			// const jose = await nftContract.owner();
			// console.log(await jose)
			// return
			const listingPrice = ethers.utils.parseUnits(value.value, 'ether');
			let feeBlockchain = await marketContract.getListingFee();
			feeBlockchain = feeBlockchain.toString();
			message = 'request for sale';
			console.log('listing Price');

			const taxe = (parseInt(listingPrice.toString()) + parseInt(feeBlockchain)).toString();
			console.log(taxe);
			const transaction = await marketContract.n2DMarketSale(marketPlace.addressNFT, tokenId + 1, {
				value: taxe
			});
			await transaction.wait();
			const approve = await nftContract.approve(marketPlace.addressMarket, tokenId);
			await approve.wait();
			message = 'push sale';
			const res = await fetch(`/query/nft/${tokenId}`, {
				method: 'PATCH',
				body: JSON.stringify({ owner: currAddress, islisted: false })
			});
			const ulta = await res.json();
			alert('You successfully bought the NFT!');
			goto('/mynfts');
		} catch (e) {
			alert('Upload Error' + e);
		}
	};
	let hidden = nft.is_hidden;
	const updatenft = async (e) => {
		let body = {};
		if (e == 'list') {
			body = { is_hidden: hidden };
		} else if (e == 'price') {
			body = { price: nft.price };
			console.log(body);
		}
		fetch(`/query/nft/${tokenId}`, {
			method: 'PATCH',
			body: JSON.stringify(body)
		});
	};

	const listOnMarket = async (e) => {
		message = 'gettings contract';
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		const marketContract = new ethers.Contract(
			marketPlace.addressMarket,
			marketPlace.abiMarket,
			signer
		);

		message = 'fetching fees';
		let listingPrice = await contractMarket.getListingFee();
		listingPrice = listingPrice.toString();

		message = 'resquest approuval';
		message = 'List token';
		console.log(tokenId);
		const transaction = await marketContract.createVaultItem(marketPlace.addressNFT, tokenId, {
			value: listingPrice
		});
		await transaction.wait();
		message = 'push results';
		const res = await fetch(`/query/nft/${tokenId}`, {
			method: 'PATCH',
			body: JSON.stringify({ listed: true })
		});
		const ulta = await res.json();
		message = 'NFT listed';
		alert('You successfully Listed the NFT!');
		goto('/mynfts');
	};
</script>

<section class="flex items-center justify-center py-20">
	<div class="w-4/5 flex rounded-lg shadow-lg shadow-white">
		{#if nft}
			<img src={nft.image} alt="nft" class="rounded-tl-lg rounded-bl-lg w-1/2" />
			<div class="bg-gray-100 rounded-tr-lg rounded-br-lg w-2/3 p-4 pl-6">
				<p class="text-3xl font-bold italic capitalize pt-7">{nft.name}</p>
				<p class=" ml-5 text-gray-600 italic pb-7">- {nft.description}.</p>
				<p class="text-xl font-bold italic capitalize">collection</p>
				<p class="ml-5 text-gray-600 italic pb-7">- {nft.collection}.</p>
				<p class="text-xl font-bold italic capitalize">Attributes</p>
				{#each nft.attributes as { trait_type, value }}
					<ul class="ml-5 text-gray-600 italic">
						<li>
							<p>- {trait_type}: {value}</p>
						</li>
					</ul>
				{/each}
				<p class="text-xl font-bold italic capitalize pt-7">Tags:</p>
				<ul class="ml-5 comma-list">
					{#each nft.tags as tag}
						<li class="inline">
							<p class="text-blue-500 inline">#{tag}</p>
						</li>
					{/each}
				</ul>

				{#if nftDataFromBlockChain}
					{#if nftOwner}
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
								<label for="checkbox">
									<span class="checkbox" />
									<p class=" text-sm text-gray-500 inline ml-2 absolute">Hide the NFT</p>
								</label>
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
										class="bg-blue-500 rounded-lg py-2 px-14  my-7 text-white float-right"
										on:click|once={() => listOnMarket(tokenId)}
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
								on:click|once={() => buyNFT(tokenId)}
							>
								Buy this NFT
							</button>
						{:else}
							<!-- can't do nothing nft not for sale -->
							<p class="text-right italic text-lg font-semibold text-red-500 mt-10">
								NFT not Listed
							</p>
						{/if}
					{/if}
				{/if}
				{#if isListed}
					<p class="text-xl text-right pt-12 pr-5">
						<span class="text-xs font-thin">Price:</span>{nft.price}<span class="font-bold italic"
							>$NFTL</span
						>
					</p>
				{:else}
					<p class="text-xl text-right pt-10 ">
						<span class="text-xs font-thin">Price:</span>{nft.price}<span class="font-bold italic"
							>$NFTL</span
						>
					</p>
				{/if}
				{#if message}
					{message}
				{/if}
			</div>
		{/if}
	</div>
</section>

<style>
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
</style>
