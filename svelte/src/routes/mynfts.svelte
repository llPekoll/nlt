<script lang="ts">

	import { onMount } from 'svelte';
	import Card from '$lib/nfts/Card.svelte';

	let nfts = [];
	let empty = true;
	let pageIndex: number = 1;
	let first_entry
	let last_entry
	let total_entry
	onMount(async () => {
		const accounts = await window.ethereum
			.request({
				method: 'eth_requestAccounts'
			})
			.catch((err) => {
				console.log(err.code);
			});
		const account = accounts[0];
		const res2 = await fetch(`query/mynfts/${pageIndex}`,
		{
			method:'POST',
			body:JSON.stringify({address:account})
		});
		nfts= await res2.json();
		console.log(nfts)
		first_entry = nfts.nfts.first_entry
		last_entry = nfts.nfts.last_entry
		total_entry = nfts.nfts.total_entry
		nfts = nfts.nfts.nfts
	});
</script>

<section>
	{#if !empty}
		<p class="flex items-center justify-center">you have no NFTs</p>
	{/if}

	<p class="flex items-center justify-center text-white">My Nfts</p>
	<div class="flex flex-wrap items-center justify-center">
		{#each nfts as nft}
			<Card {nft} toDispay={false} />
		{/each}
	</div>
</section>
<div class="flex flex-col items-center">
	<!-- Help text -->
	<span class="text-sm text-white dark:text-gray-400">
		Showing <span class="font-semibold text-gray-300 dark:text-white">{first_entry}</span>
		to <span class="font-semibold text-gray-300 dark:text-white">{last_entry}</span> of
		<span class="font-semibold text-gray-300 dark:text-white">{total_entry}</span> Entries
	</span>
	<div class="inline-flex mt-2 xs:mt-0">
		<!-- Buttons -->
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
</div>