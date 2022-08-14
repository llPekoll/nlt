<script lang="ts">
    import { goto } from '$app/navigation';

    import { marketAddress, NFTLAddress } from '$lib/config.js';
    import NFT from '$lib/NFT.json'
    import {ethers} from 'ethers';


    let message = 'None'
    const onSubmit = async(e)=>{
        console.log('submiting');
        message = "poccessing";
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(marketAddress, NFT.abi, signer);
            let tokenId = await contract.getLatestIdToListedToken();
            tokenId = ethers.utils.formatUnits(tokenId[0], 0);
            const formData = new FormData(e.target)
    
            formData.append("tokenId", tokenId);
            const jsonLocation = await fetch('/query/create', {
                method: 'POST',
                body: formData
                })
            const tokenUri = await jsonLocation.json();
            
            const price = ethers.utils.parseUnits(formData.get('price'),'ether');
            console.log('price');
            console.log(price);
            let listingPrice = await contract.getListPrice();
            listingPrice = listingPrice.toString();
            console.log('listingPrice');
            console.log(listingPrice);
            let transcation = await contract.createToken(tokenUri.location, price, {value:listingPrice});
            await transcation.wait();
            message = 'success'
            alert(`NFT uploaded with success`);
            goto('/')
        }catch(e){
            alert(`Error : ${e}`);
        }
    }
</script>

<div class="flex items-center justify-center">
	<div class="card w-100 bg-gray-200 rounded-lg py-10 px-10 shadow-lg">
    <div class="text-xl font-bold text-center">
		NFT<span class="italic font-thin">Creation
    </div>
		<form method="post" enctype="multipart/form-data" on:submit|preventDefault={onSubmit} >
			<div class="text-center mx-auto py-3">
				<label for="image" class="block py-1">image</label>
				<input name="image" class="w-64" type="file" required />
			</div>
			<div class="text-center mx-auto py-3">
				<label for="name" class="">name</label>
				<input name="name" type="text" required />
			</div>
			<div class="text-center mx-auto py-3">
				<label for="price" class="">price</label>
				<input name="price" type="number" step="0.01" required />
			</div>
			<div class="text-center mx-auto py-3">
				<label for="description" class="block">description:</label>
				<textarea id="story" name="description" rows="5" cols="33" class="p-2">who is comming to dina?</textarea>
			</div>
            {#if message =='None'}
                <div class="text-center">
                    <button type="submit" class="bg-blue-500 py-2 px-10 rounded-lg shadow-md text-white">
                        submit
                    </button>
                </div>
            {:else}
                {message}
            {/if}
		</form>
	</div>
</div>
