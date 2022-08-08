<script lang="ts">
	//  import { defaultEvmStores, web3, selectedAccount, connected, chainId, chainData } from 'svelte-web3'
	export let connected: boolean;
	import { onMount } from 'svelte';
	let currentAccount:string = '';
	onMount(async () => {
		const web3 = new Web3(window.ethereum);
		const account = await web3.eth.getAccounts();
		if (account) {
			connected = true;
		}
	});
	const connectWallet = async () => {
		const accounts = await window.ethereum
			.request({
				method: 'eth_requestAccounts'
			})
			.catch((err) => {
				console.log(err.code);
			});
		const account = accounts[0];
		currentAccount = account;
		console.log(accounts);
		connected = Boolean(account);
	};
</script>

<section class="flex items-center justify-center h-screen w-screen">
	<button
		on:click={connectWallet}
		class="bg-red-100  px-10 py-2  text-red-900 font-bold rounded-full"
	>
		Connect
	</button>
</section>
