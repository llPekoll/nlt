<script>
	import marketPlace from '$lib/Marketplace.json';
	import { env } from '$lib/env.js';
	import { onMount } from 'svelte';
	import Card from '$lib/nfts/Card.svelte';

	let tier1;
	let tier2;
	let tier3;
	let ownsNfts = false;
	onMount(async () => {
		if (window.ethereum) {
			const accounts = await window.ethereum
				.request({
					method: 'eth_requestAccounts'
				})
				.catch((err) => {
					console.log(err.code);
				});
			const account = accounts[0];
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(marketPlace.address, marketPlace.abi, signer);
			console.log(account);
			// TODO:
			// Make an array and push that into an array instead
			tier1 = await contract.balanceOf(account, 0);
			tier2 = await contract.balanceOf(account, 1);
			tier3 = await contract.balanceOf(account, 2);
			tier1 = ethers.utils.formatUnits(tier1, 0);
			tier1 = parseInt(tier1);
			tier2 = ethers.utils.formatUnits(tier2, 0);
			tier2 = parseInt(tier2);
			tier3 = ethers.utils.formatUnits(tier3, 0);
			tier3 = parseInt(tier3);
			console.log('===========');
			console.log(tier1);
			console.log(tier2);
			console.log(tier3);
			if (tier1 || tier2 || tier3) {
				ownsNfts = true;
			}
		}
	});
</script>

{#if ownsNfts}
	<h1 class="py-10 flex items-center justify-center">NFTs</h1>
	<div class="flex items-center justify-center">
		{#if tier1}
			<Card nlt={NLT1} />
		{/if}
		{#if tier2}
			<Card nlt={NLT2} />
		{/if}
		{#if tier3}
			<Card nlt={NLT3} />
		{/if}
	</div>
{:else}
	<div class="flex items-center justify-center h-screen">No NLT on this account Yet!</div>
{/if}
