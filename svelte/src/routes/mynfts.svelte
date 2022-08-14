<script lang="ts">
	import { nftAddress, marketAddress, NFTLAddress } from '$lib/config.js';
	import NFT from '$lib/NFT.json'
	import NFTMarket from '$lib/NFTMarket.json'
	import {ethers} from 'ethers';
	import Share from '$lib/Share.svelte';
	import Nfts from './nfts.svelte';
	import { onMount } from 'svelte';
	import Card from '$lib/nfts/Card.svelte';
	export let trad;

	let nfts:Promise<any>[] = [];
	let loadingState = 'not-loaded';
	let empty =true;
	onMount(async()=>{
		const loadNFTs = async () =>{
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(marketAddress, NFT.abi, signer);

			// const NFTLContract = new ethers.Contract(NFTLAddress, NFT.abi, provider);
			let transaction = await contract.getMyNFTs()

			let items = await Promise.all(transaction.map(async i =>{
				const tokenUri = await contract.tokenURI(i.tokenId);
				let meta = await fetch(tokenUri);
				meta = await meta.json()
				let price = ethers.utils.formatUnits(i.price.toString(),'ether');
				console.log("meta")
				console.log(meta)
				let item = {
					price, 
					tokenId: i.tokenId.toNumber(),
					seller:i.seller,
					owner: i.owner,
					image: meta.image,
					name: meta.name,
					description: meta.description
				}
				return item
			}))
			return items
		}
		nfts = await loadNFTs();
		console.log(nfts.length)
		if(!nfts.length){
			empty =true
		}
	})

</script>
<section>
{#if !empty}
	<p class="flex items-center justify-center">
		you have no NFTs
	</p>
{/if }

<p class="flex items-center justify-center">
	wellcome to an NFTL HUB
</p>
<div class="flex flex-wrap items-center justify-center">
{#each nfts as nft }
	<Card {nft}/>
{/each}
</div>

</section>