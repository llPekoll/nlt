<script lang='ts'>
    import { nftAddress, marketAddress, NFTLAddress } from '$lib/config.js';
    import NFT from '$lib/NFT.json'
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import {ethers} from 'ethers';
    import { goto } from '$app/navigation';

    const tokenId = $page.params.slug

    let nft;
    let currAddress;
    onMount(async()=>{
		const accounts = await window.ethereum
			.request({
				method: 'eth_requestAccounts'
			})
			.catch((err) => {
				console.log(err.code);
			});
		const account = accounts[0];
		currAddress = account;


		const loadNFTs = async () =>{
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(marketAddress, NFT.abi, signer);
            const tokenUri = await contract.tokenURI(tokenId);
            const listedToken = await contract.getListedTokenForId(tokenId);

            let meta = await fetch(tokenUri);
            meta = await meta.json()
            let item = {
                price:meta.price, 
                tokenId: tokenId,
                seller:listedToken.seller,
                owner: listedToken.owner,
                image: meta.image,
                name: meta.name,
                description: meta.description
            }
            return item
		}
		nft = await loadNFTs();
	})

    const buyNFT = async(tokenId) =>{
        try {
            console.log(1)
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log(2)
            const signer = provider.getSigner();
            console.log(3)
            const contract = new ethers.Contract(marketAddress, NFT.abi, signer);
            console.log(4)
            const salePrice = ethers.utils.parseUnits(nft.price, 'ether')
            console.log(5)
            let transaction = await contract.executeSale(tokenId, {value:salePrice});
            console.log(6)
            await transaction.wait();
            alert('You successfully bought the NFT!');
            goto('/mynfts')
        }
        catch(e) {
            alert("Upload Error"+e)
        }
}

</script>
<section class="flex items-center justify-center py-20">
    <div class="w-1/2 flex rounded-lg shadow-lg shadow-white">
        {#if nft}
            <img src={nft.image} alt='nft' class="rounded-tl-lg rounded-bl-lg w-1/2"/>
            <div class="bg-gray-100 rounded-tr-lg rounded-br-lg w-1/2 p-4">
                <p class="text-xl pb-3 font-bold italic capitalize">{nft.name}</p>
                <p class="">{nft.description}</p>
                <p class="text-xl text-right pt-10"><span class="text-xs font-thin">Price:</span>{nft.price}<span class="font-bold italic">$BNB</span></p>
                {#if currAddress == nft.owner.toLowerCase() || currAddress == nft.seller.toLowerCase()} 
                    <div class="text-red-700">You are the owner of this NFT</div>
                {:else} 
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" on:click|once={() => buyNFT(tokenId)}>
                    Buy this NFT
                </button>
            {/if}
            </div>
        {/if}
    </div>
</section>