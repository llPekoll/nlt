<script lang="ts">
	import { env } from '$lib/env';
	import { goto } from '$app/navigation';
	import Tags from 'svelte-tags-input';
	import { marketplace, chainId } from '$lib/settings.js';
	import { ethers } from 'ethers';
	import Loader from '$lib/Loader.svelte';

	let key;
	let value;
	let message = '';
	let tags = '';
	let price;

	// attributes
	let attributes = [];
	const addAttributes = () => {
		attributes = [
			...attributes,
			{
				trait_type: key,
				value: value
			}
		];
		key = '';
		value = '';
	};
	const remove = (attribute) => {
		attributes = attributes.filter((i) => i !== attribute);
	};

	// Tags
	function handleTags(event) {
		tags = event.detail.tags;
	}

	const onSubmit = async (e) => {
		const accounts = await window.ethereum
			.request({
				method: 'eth_requestAccounts'
			})
			.catch((err) => {
				console.log(err.code);
			});
		const account = accounts[0];
		await ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [
				{
					chainId
				}
			]
		});
		message = 'poccessing';
		const formData = new FormData(e.target);

		try {
			message = 'gettings contracts';
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(marketplace.address, marketplace.abi, signer);

			message = `/===== Prepare for mint ======/`;
			const timestap = new Date().valueOf();
			const tokenUri = `${env.VITE_CDN_EXPOSE_URL}/${env.VITE_S3_ROOT}/${timestap}.json`;
			let listingPrice = await contract.getListingPrice();
			listingPrice = listingPrice.toString();
			message = `/===== mint NFT ======/`;
			console.log('price');
			console.log(price);
			console.log(listingPrice);
			// make it x9 ethers utils
			let createdNFT = await contract.createToken(tokenUri, price.toString(), {
				value: listingPrice
			});
			const res = await createdNFT.wait();
			const tokenId = res.events[0].args[2].toString();

			message = `/===== Pushing to MarketPlace ======/`;

			const attributesFormated = attributes.map(function (e) {
				return { trait_type: e.trait_type, value: e.value };
			});
			formData.append('attributes', attributesFormated);

			// send to S3 bucket
			const payload = {
				tokenId,
				tokenUri,
				creator: account,
				attributes: attributesFormated,
				name: formData.get('name'),
				description: formData.get('description'),
				image: formData.get('image').name,
				price: formData.get('price'),
				tags: tags,
				collection: formData.get('collection'),
				// isHidden: Boolean(formData.get('is-hidden'))
				isHidden: false
			};
			await fetch('/query/createjson', {
				method: 'POST',
				body: JSON.stringify(payload)
			});
			formData.append('tokenId', tokenId);
			fetch('/query/createimage', {
				method: 'POST',
				body: formData
			});
			message = `/===== NFT Listed ======/`;
			message = 'success';
			alert(`NFT uploaded with success`);
			goto('/');
		} catch (e) {
			alert(`Error : ${e}`);
		}
	};
	let input;
	let img;
	let showImage = false;
	const onChange = () => {
		const file = input.files[0];
		if (file) {
			showImage = true;

			const reader = new FileReader();
			reader.addEventListener('load', function () {
				img.setAttribute('src', reader.result);
			});
			reader.readAsDataURL(file);

			return;
		}
		showImage = false;
	};
</script>

<div class="flex items-center justify-center py-10">
	<div class="card w-4/5 bg-gray-200 rounded-lg py-10 shadow-lg">
		<div class="text-xl font-bold text-center">
			NFT<span class="italic font-thin">Creation</span>
		</div>
		{#if showImage}
			<img bind:this={img} src="" alt="Preview" class="w-32 h-32 text-center mx-auto mt-10" />
		{/if}
		<form method="post" enctype="multipart/form-data" on:submit|preventDefault={onSubmit}>
			<div class="flex justify-center items-center w-4/5 mx-auto py-5">
				<label
					for="dropzone-file"
					class="flex flex-col justify-center items-center w-full h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
				>
					<div class="flex flex-col justify-center items-center pt-5 pb-6">
						<svg
							aria-hidden="true"
							class="mb-3 w-10 h-10 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
							/></svg
						>
						<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
							<span class="font-semibold">Click to upload</span>
						</p>
						<p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF</p>
					</div>
					<input
						bind:this={input}
						on:change={onChange}
						id="dropzone-file"
						name="image"
						type="file"
						class="hidden"
						required
						accept="image/png, image/jpg, image/jpeg, image/gif"
					/>
				</label>
			</div>
			<div class=" w-4/5 mx-auto">
				<div class="relative z-0 mb-6 w-full group ">
					<input
						type="text"
						name="name"
						class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						required
						placeholder=" "
					/>
					<label
						for="floating_email"
						class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>Name</label
					>
				</div>
			</div>
			<div class=" w-4/5 mx-auto">
				<div class="relative z-0 mb-6 w-full group ">
					<input
						type="number"
						name="price"
						min="1000"
						class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						required
						placeholder=" "
						bind:value={price}
					/>
					<label
						for="floating_email"
						class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>Price ($NFTL)</label
					>
				</div>
			</div>
			<div class=" w-4/5 mx-auto">
				<div class="relative z-0 mb-6 w-full group ">
					<input
						type="text"
						name="collection"
						class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
					/>
					<label
						for="floating_email"
						class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>Collection (facultatif)</label
					>
				</div>
			</div>

			<div class=" w-4/5 mx-auto">
				<div class="relative z-0 mb-6 w-full group ">
					<input
						type="text"
						name="description"
						class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						required
						placeholder=" "
					/>
					<label
						for="floating_email"
						class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
						>Description</label
					>
				</div>
			</div>
			<!-- <div class="w-4/5 mx-auto">
				<input name="is-hidden" type="checkbox" class="checkbox-input" id="checkbox" />
				<label for="checkbox">
					<span class="checkbox" />
					<p class=" text-sm text-gray-500 inline ml-2 absolute">Display the NFT in the market place</p>
				</label>
			</div> -->
			<div class=" w-4/5 mx-auto py-3">
				<label for="tags" class="text-left text-sm text-gray-500"
					>Tags
					<Tags on:tags={handleTags} addKeys={[9]} />
				</label>
			</div>
			{#if attributes.length > 0}
				<div class="w-4/5 mx-auto text-gray-500 text-center mx-auto text-xl">-- Attributes --</div>
			{/if}
			<ul class="w-4/5 mx-auto text-gray-500 mt-3">
				{#each attributes as attribute}
					<li>
						<span>{attribute.trait_type}</span>
						<span>{attribute.value}</span>
						<button on:click={() => remove(attribute)} class="text-red-500">&times;</button>
					</li>
				{/each}
			</ul>
			<form on:submit|preventDefault={addAttributes} class=" w-4/5 mx-auto mt-4">
				<label for="attribute" class="block text-gray-500 text-center">Add an attribute</label>
				<div class="flex items-center mt-2 ">
					<div class="relative z-0 mb-6 w-1/2 group ">
						<input
							type="text"
							bind:value={key}
							required
							placeholder=" "
							class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						/>
						<label
							for="jose"
							class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>Key</label
						>
					</div>
					<div class="relative z-0 mb-6 w-1/2 group">
						<input
							type="text"
							bind:value
							required
							class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
							placeholder=" "
						/>
						<label
							for="fsd"
							class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
							>value</label
						>
					</div>
				</div>
				<button
					on:submit|preventDefault={addAttributes}
					type="submit"
					class="block bg-green-400 px-5 py-0.5 rounded text-white text-center mx-auto mt-2 font-thin"
				>
					add
				</button>
			</form>
			<div class=" my-10">
				{#if message == ''}
					<div class="text-center text-xl  w-4/5 mx-auto">
						<button type="submit" class="bg-blue-500 py-2 px-10 rounded-lg shadow-md text-white w-full">
							submit
						</button>
					</div>
				{:else}
					<div class="text-center">
						{message}
						<div class="w-1/6 mx-auto filter-green">
							<Loader version="1" />
						</div>
					</div>
				{/if}
			</div>
		</form>
	</div>
</div>

<style>
	.filter-green {
		filter: invert(0%) sepia(100%) saturate(7500%) hue-rotate(234deg) brightness(118%) contrast(87%);
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
