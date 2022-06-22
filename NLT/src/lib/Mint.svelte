<script lang="ts">
    import NLTNFT from './NLTNFT.json';

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
                console.log(7)
                console.log('res:', res);
            } catch (err) {
                console.log('err:',err)
            }
        }
    }

</script>
<div class="flex items-center justify-center pt-20">
    <button on:click={handleMint} class=" py-2 px-10 bg-red-600 text-white rounded-lg">
        Mint
    </button>
</div>