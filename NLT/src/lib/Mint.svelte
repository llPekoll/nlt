<script lang="ts">
    import NLTNFT from './NLTNFT.json';
    import NTL1 from './0.json';
    import NTL2 from './1.json';
    import NTL3 from './2.json';
    import MintCard from './MintCard.svelte';

    const nltContractAddress = '0x51B2876D671E96FAF773dC66239965bA9B9b7526'

    const handleMint = async () => {
        console.log('handleMint');
        if(window.ethereum){
            console.log(1)
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log(2)
            const signer = provider.getSigner();
            console.log(3)
            const contract = new ethers.Contract(nltContractAddress, NLTNFT.abi, signer);
            console.log(4)
            try {
                console.log(5)
                // console.log(contract)
                // const a = ethers.BigNumber.from('1')
                // const b = ethers.BigNumber.from('1')
                // console.log(a)
                const j = ethers.utils.parseEther((0.4).toString())
                console.log(contract)
                // const res = await contract.withdraw();
                const res = await contract.mintPrices(1);
                const res2 = await contract.tiers(1);
                const res3 = await contract.tiers(2);
                const res4 = await contract.uri(2);
                // const res3 = await contract.isPublicMintEnable();
                console.log(7)
                // ethers.utils.formatEther( value )
                console.log('res:', ethers.utils.formatEther(res));
                console.log('res:', ethers.utils.formatUnits(res2,0));
                console.log('res:', ethers.utils.formatUnits(res3,0));
                console.log('res:', res4);
                // console.log('res:', res3);
            } catch (err) {
                console.log('err:',err)
            }
        }
    }

</script>
<div class="flex items-center justify-center pt-20">
    <MintCard nlt={NTL1} />
    <MintCard nlt={NTL2} />
    <MintCard nlt={NTL3} />
    <button on:click={handleMint} class=" py-2 px-10 bg-red-600 text-white rounded-lg">
        Mint
    </button>
</div>