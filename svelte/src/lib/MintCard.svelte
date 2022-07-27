<script>
	import NLTNFT from './NLTNFT.json';
	import { env } from '$lib/env.js';
	export let nlt;
	export let id;
	export let price;
	const src = nlt.image;

	let mintPrice;
	let tier;
	let total;
	let max;
	console.log(price);
	const init = async () => {
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(env.VITE_CONTRACT_NUMBER, NLTNFT.abi, signer);
			console.log('contract');
			console.log(contract);

			if (id == 999) {
				return 0;
			} else {
				mintPrice = await contract.mintPrices(id);
				mintPrice = ethers.utils.formatUnits(mintPrice, 18);
				max = await contract.maxSupplys(nlt.tier - 1);
				max = ethers.utils.formatUnits(max, 0);
				total = await contract.totalSupplys(nlt.tier - 1);
				total = ethers.utils.formatUnits(total, 0);
			}
		}
	};
	init();
	const handleMint = async () => {
		console.log('handleMint');
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(env.VITE_CONTRACT_NUMBER, NLTNFT.abi, signer);
			try {
				console.log('price =====');
				console.log(mintPrice);
				const j = ethers.utils.parseEther(mintPrice.toString());
				console.log(j);

				const res3 = await contract.mint(id, { value: j });
				console.log(7);
				console.log('res:', res3);
			} catch (err) {
				console.log('err:', err);
			}
		}
	};
</script>

<div class="">
	<div
		class="lock p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
	>
		<p class="text-center mx-auto pb-5">{nlt.name}</p>
		<img {src} alt="nlt" class="w-40 text-center mx-auto" />
		<p class="text-xs text-justify py-5">{@html nlt.descriptionHTML}</p>
		<p class="text-sm py-3">
			tier :{nlt.tier ? nlt.tier : '?'}
		</p>
		<p class="text-right font-bold pb-2 italic">
			<span class="font-thin text-xs italic">price:</span>
			{mintPrice ? mintPrice : '?'} BNB
		</p>
		<button
			on:click={handleMint}
			class=" py-2 px-10 bg-red-600 text-white rounded-lg my-2 text-center mx-auto w-full"
		>
			Mint
		</button>
		<p class="text-right font-bold pb-2 italic">
			<span class="font-thin text-xs italic">minted:</span>{total ? total : '?'}/{max ? max : '?'}
		</p>
	</div>
</div>
